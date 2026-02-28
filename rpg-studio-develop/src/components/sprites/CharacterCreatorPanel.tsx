import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { FormDivider, FormField, FormRow, FormSectionTitle } from "ui/form/layout/FormLayout";
import { Input } from "ui/form/Input";
import { Button } from "ui/buttons/Button";
import { Select } from "ui/form/Select";
import { spriteSheetSelectors } from "store/features/entities/entitiesState";
import editorActions from "store/features/editor/editorActions";
import { useAppDispatch, useAppSelector } from "store/hooks";
import API from "renderer/lib/api";

type BodyBuild = "slim" | "average" | "stocky";
type HairStyle = "short" | "long" | "spiky";
type OutfitStyle = "tunic" | "robe" | "armor";
type PaletteName = "earth" | "ocean" | "ember";

type CharacterPalette = {
  skin: string;
  hair: string;
  clothes: string;
  detail: string;
  outline: string;
};

const palettes: Record<PaletteName, CharacterPalette> = {
  earth: {
    skin: "#c9a980",
    hair: "#3a2c22",
    clothes: "#4b7a4b",
    detail: "#93b874",
    outline: "#101010",
  },
  ocean: {
    skin: "#c9a980",
    hair: "#213b66",
    clothes: "#3d7f97",
    detail: "#84c5cc",
    outline: "#101010",
  },
  ember: {
    skin: "#c9a980",
    hair: "#54211f",
    clothes: "#9a4431",
    detail: "#d58b3f",
    outline: "#101010",
  },
};

const Preview = styled.img`
  width: 192px;
  height: 32px;
  image-rendering: pixelated;
  border: 1px solid ${(props) => props.theme.colors.input.border};
  background: ${(props) => props.theme.colors.input.background};
`;

const drawFrame = (
  ctx: CanvasRenderingContext2D,
  frameX: number,
  direction: "front" | "back" | "side",
  step: 0 | 1,
  build: BodyBuild,
  hair: HairStyle,
  outfit: OutfitStyle,
  palette: CharacterPalette,
) => {
  const x = frameX * 16;
  const bodyWidth = build === "slim" ? 4 : build === "stocky" ? 6 : 5;
  const bodyLeft = x + Math.floor((16 - bodyWidth) / 2);
  const headLeft = x + 5;
  const legOffset = step ? 1 : 0;

  ctx.fillStyle = palette.outline;
  ctx.fillRect(bodyLeft - 1, 5, bodyWidth + 2, 8);

  ctx.fillStyle = palette.skin;
  if (direction === "side") {
    ctx.fillRect(headLeft + 1, 1, 5, 4);
  } else {
    ctx.fillRect(headLeft, 1, 6, 4);
  }

  ctx.fillStyle = palette.hair;
  if (hair === "short") {
    ctx.fillRect(headLeft, 0, 6, 2);
    if (direction === "side") {
      ctx.fillRect(headLeft + 4, 1, 2, 2);
    }
  } else if (hair === "long") {
    ctx.fillRect(headLeft, 0, 6, 2);
    ctx.fillRect(headLeft, 2, direction === "side" ? 2 : 6, 2);
  } else {
    ctx.fillRect(headLeft, 0, 2, 2);
    ctx.fillRect(headLeft + 2, 0, 2, 1);
    ctx.fillRect(headLeft + 4, 0, 2, 2);
  }

  ctx.fillStyle = palette.clothes;
  ctx.fillRect(bodyLeft, 6, bodyWidth, outfit === "robe" ? 6 : 5);

  ctx.fillStyle = palette.detail;
  if (outfit === "armor") {
    ctx.fillRect(bodyLeft + 1, 7, Math.max(1, bodyWidth - 2), 1);
    ctx.fillRect(bodyLeft + 1, 9, Math.max(1, bodyWidth - 2), 1);
  } else if (outfit === "robe") {
    ctx.fillRect(bodyLeft + 1, 10, Math.max(1, bodyWidth - 2), 1);
  } else {
    ctx.fillRect(bodyLeft, 8, bodyWidth, 1);
  }

  ctx.fillStyle = palette.clothes;
  if (direction === "side") {
    ctx.fillRect(bodyLeft - 1, 7 + (step ? 1 : 0), 2, 3);
    ctx.fillRect(bodyLeft + bodyWidth - 1, 7 + (step ? 0 : 1), 2, 3);
  } else {
    ctx.fillRect(bodyLeft - 1, 7 + (step ? 1 : 0), 2, 3);
    ctx.fillRect(bodyLeft + bodyWidth - 1, 7 + (step ? 0 : 1), 2, 3);
  }

  ctx.fillRect(bodyLeft, 11, 2, 3);
  ctx.fillRect(
    bodyLeft + bodyWidth - 2,
    11 + legOffset,
    2,
    Math.max(2, 3 - legOffset),
  );
};

const buildCharacterSheet = (
  build: BodyBuild,
  hair: HairStyle,
  outfit: OutfitStyle,
  paletteName: PaletteName,
) => {
  const canvas = document.createElement("canvas");
  canvas.width = 96;
  canvas.height = 16;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return "";
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const palette = palettes[paletteName];

  drawFrame(ctx, 0, "side", 1, build, hair, outfit, palette);
  drawFrame(ctx, 1, "side", 0, build, hair, outfit, palette);
  drawFrame(ctx, 2, "back", 1, build, hair, outfit, palette);
  drawFrame(ctx, 3, "back", 0, build, hair, outfit, palette);
  drawFrame(ctx, 4, "front", 1, build, hair, outfit, palette);
  drawFrame(ctx, 5, "front", 0, build, hair, outfit, palette);

  return canvas.toDataURL("image/png");
};

const randomOf = <T extends string>(values: readonly T[]): T =>
  values[Math.floor(Math.random() * values.length)];

export const CharacterCreatorPanel = () => {
  const dispatch = useAppDispatch();
  const sprites = useAppSelector((state) => spriteSheetSelectors.selectAll(state));
  const [filename, setFilename] = useState("hero");
  const [build, setBuild] = useState<BodyBuild>("average");
  const [hair, setHair] = useState<HairStyle>("short");
  const [outfit, setOutfit] = useState<OutfitStyle>("tunic");
  const [palette, setPalette] = useState<PaletteName>("earth");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [pendingFilename, setPendingFilename] = useState("");

  const previewData = useMemo(
    () => buildCharacterSheet(build, hair, outfit, palette),
    [build, hair, outfit, palette],
  );

  useEffect(() => {
    if (!pendingFilename) {
      return;
    }
    const sprite = sprites.find((s) => s.filename.toLowerCase() === pendingFilename.toLowerCase());
    if (!sprite) {
      return;
    }
    dispatch(editorActions.setSelectedSpriteSheetId(sprite.id));
    setPendingFilename("");
  }, [dispatch, pendingFilename, sprites]);

  const onRandomize = useCallback(() => {
    setBuild(randomOf(["slim", "average", "stocky"] as const));
    setHair(randomOf(["short", "long", "spiky"] as const));
    setOutfit(randomOf(["tunic", "robe", "armor"] as const));
    setPalette(randomOf(["earth", "ocean", "ember"] as const));
  }, []);

  const onCreate = useCallback(async () => {
    if (!previewData) {
      setStatus("Could not generate preview");
      return;
    }
    setSaving(true);
    setStatus("");
    try {
      const createdFilename = await API.project.createSpriteAsset(
        filename,
        previewData,
      );
      if (createdFilename) {
        setPendingFilename(createdFilename);
        setStatus(`Created ${createdFilename}`);
      } else {
        setStatus("Could not create sprite file");
      }
    } catch (e) {
      setStatus("Could not create sprite file");
    } finally {
      setSaving(false);
    }
  }, [filename, previewData]);

  return (
    <>
      <FormDivider />
      <FormSectionTitle>Character Creator</FormSectionTitle>
      <FormRow>
        <Preview src={previewData} alt="Character preview" />
      </FormRow>
      <FormRow>
        <FormField name="characterFilename" label="Sprite Name">
          <Input
            value={filename}
            placeholder="hero"
            onChange={(e) => setFilename(e.currentTarget.value)}
          />
        </FormField>
      </FormRow>
      <FormRow>
        <FormField name="characterBuild" label="Build">
          <Select
            value={{ value: build, label: build }}
            options={[
              { value: "slim", label: "slim" },
              { value: "average", label: "average" },
              { value: "stocky", label: "stocky" },
            ]}
            onChange={(value) => setBuild((value?.value || "average") as BodyBuild)}
          />
        </FormField>
      </FormRow>
      <FormRow>
        <FormField name="characterHair" label="Hair">
          <Select
            value={{ value: hair, label: hair }}
            options={[
              { value: "short", label: "short" },
              { value: "long", label: "long" },
              { value: "spiky", label: "spiky" },
            ]}
            onChange={(value) => setHair((value?.value || "short") as HairStyle)}
          />
        </FormField>
      </FormRow>
      <FormRow>
        <FormField name="characterOutfit" label="Outfit">
          <Select
            value={{ value: outfit, label: outfit }}
            options={[
              { value: "tunic", label: "tunic" },
              { value: "robe", label: "robe" },
              { value: "armor", label: "armor" },
            ]}
            onChange={(value) => setOutfit((value?.value || "tunic") as OutfitStyle)}
          />
        </FormField>
      </FormRow>
      <FormRow>
        <FormField name="characterPalette" label="Palette">
          <Select
            value={{ value: palette, label: palette }}
            options={[
              { value: "earth", label: "earth" },
              { value: "ocean", label: "ocean" },
              { value: "ember", label: "ember" },
            ]}
            onChange={(value) => setPalette((value?.value || "earth") as PaletteName)}
          />
        </FormField>
      </FormRow>
      <FormRow>
        <Button onClick={onRandomize} disabled={saving}>
          Randomize
        </Button>
        <Button onClick={onCreate} disabled={saving || !filename.trim()}>
          {saving ? "Creating..." : "Create Sprite"}
        </Button>
      </FormRow>
      {status && <FormRow>{status}</FormRow>}
    </>
  );
};

export default CharacterCreatorPanel;
