/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 63457:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("../wasm/binjgb.fd61fe5e04b9dc2bcf6ebada43ebb7e1.wasm");

/***/ }),

/***/ 46521:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("../wasm/rgbasm.312dc93c5ad22775f171691de149f4a4.wasm");

/***/ }),

/***/ 27077:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("../wasm/rgbfix.134dab95f8edf38ea925c38b4dbe48ce.wasm");

/***/ }),

/***/ 21670:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("../wasm/rgblink.87d36560b7aaef9528aa0dde01bd400f.wasm");

/***/ }),

/***/ 53326:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("include \"include/hardware.inc\"\ninclude \"include/hUGE.inc\"\n\nMACRO add_a_to_r16\n    add LOW(\\1)\n    ld LOW(\\1), a\n    adc HIGH(\\1)\n    sub LOW(\\1)\n    ld HIGH(\\1), a\nENDM\n\n;; Thanks PinoBatch!\nMACRO sub_from_r16 ;; (high, low, value)\n    ld a, \\2\n    sub \\3\n    ld \\2, a\n    sbc a  ; A = -1 if borrow or 0 if not\n    add \\1\n    ld \\1, a\nENDM\n\nMACRO retMute\n    bit \\1, a\n    ret nz\nENDM\n\nMACRO checkMute\n    ld a, [mute_channels]\n    bit \\1, a\n    jr nz, \\2\nENDM\n\n;; Maximum pattern length\nPATTERN_LENGTH EQU 64\n\nSECTION \"Playback variables\", WRAM0\n;; Active song descriptor\norder_cnt: db\n_start_song_descriptor_pointers:\n;; Pointers to the song's current four orders (one per channel)\norder1: dw\norder2: dw\norder3: dw\norder4: dw\n\n;; Pointers to the instrument tables\nduty_instruments: dw\nwave_instruments: dw\nnoise_instruments: dw\n\n;; Misc. pointers\nroutines: dw\nwaves: dw\n_end_song_descriptor_pointers:\n\n;; Pointers to the current patterns (sort of a cache)\npattern1: dw\npattern2: dw\npattern3: dw\npattern4: dw\n\n;; How long a row lasts in ticks (1 = one row per call to `hUGE_dosound`, etc. 0 translates to 256)\nticks_per_row: db\n\n_hUGE_current_wave::\nhUGE_current_wave::\n;; ID of the wave currently loaded into wave RAM\ncurrent_wave: db\nhUGE_NO_WAVE equ 100\n    EXPORT hUGE_NO_WAVE\n\n;; Everything between this and `end_zero` is zero-initialized by `hUGE_init`\nstart_zero:\n\n_hUGE_mute_mask::\nmute_channels: db\n\ncounter: db\ntick: db\nrow_break: db\nnext_order: db\nrow: db\ncurrent_order: db\n\nIF DEF(PREVIEW_MODE)\nloop_order: db\nENDC\n\nchannels:\n;;;;;;;;;;;\n;;Channel 1\n;;;;;;;;;;;\nchannel1:\nchannel_period1: dw\ntoneporta_target1: dw\nchannel_note1: db\nhighmask1: db\nvibrato_tremolo_phase1: db\nenvelope1: db\ntable1: dw\ntable_row1: db\nds 5\n\n;;;;;;;;;;;\n;;Channel 2\n;;;;;;;;;;;\nchannel2:\nchannel_period2: dw\ntoneporta_target2: dw\nchannel_note2: db\nhighmask2: db\nvibrato_tremolo_phase2: db\nenvelope2: db\ntable2: dw\ntable_row2: db\nds 5\n\n;;;;;;;;;;;\n;;Channel 3\n;;;;;;;;;;;\nchannel3:\nchannel_period3: dw\ntoneporta_target3: dw\nchannel_note3: db\nhighmask3: db\nvibrato_tremolo_phase3: db\nenvelope3: db\ntable3: dw\ntable_row3: db\nds 5\n\n;;;;;;;;;;;\n;;Channel 4\n;;;;;;;;;;;\nchannel4:\nchannel_period4: dw\ntoneporta_target4: dw\nchannel_note4: db\nhighmask4: db\nstep_width4: db\nvibrato_tremolo_phase4: db\nenvelope4: db\ntable4: dw\ntable_row4: db\nds 4\n\nend_zero:\n\nSECTION \"Sound Driver\", ROM0\n\nIF DEF(GBDK)\n_hUGE_init::\n    ld h, d\n    ld l, e\nENDC\n\n;;; Sets up hUGEDriver to play a song.\n;;; !!! BE SURE THAT `hUGE_dosound` WILL NOT BE CALLED WHILE THIS RUNS !!!\n;;; Param: HL = Pointer to the \"song descriptor\" you wish to load (typically exported by hUGETracker).\n;;; Destroys: AF C DE HL\nhUGE_init::\n    ld a, [hl+] ; tempo\n    ld [ticks_per_row], a\n\n    ld a, [hl+]\n    ld e, a\n    ld a, [hl+]\n    ld d, a\n    ld a, [de]\n    ld [order_cnt], a\n\n    ld c, _end_song_descriptor_pointers - (_start_song_descriptor_pointers)\n    ld de, order1\n\n.copy_song_descriptor_loop:\n    ld a, [hl+]\n    ld [de], a\n    inc de\n    dec c\n    jr nz, .copy_song_descriptor_loop\n\nIF !DEF(PREVIEW_MODE)\n    ;; Zero some ram\n    ld c, end_zero - start_zero\n    ld hl, start_zero\n    xor a\n.fill_loop:\n    ld [hl+], a\n    dec c\n    jr nz, .fill_loop\nENDC\n\n    ;; These two are zero-initialized by the loop above, so these two writes must come after\n    ld a, %11110000\n    ld [envelope1], a\n    ld [envelope2], a\n\n    ;; Force loading the next wave\n    ld a, hUGE_NO_WAVE\n    ld [current_wave], a\n\n;; Preview mode needs to load the order ID from memory\nIF !DEF(PREVIEW_MODE)\n    ld c, 0\nELSE\n    ld a, [current_order]\n    ld c, a\nENDC\n    ;; fallthrough (load the pattern pointers)\n\n;;; Sets all 4 pattern pointers from a certain index in the respective 4 orders.\n;;; Param: C = The index (in increments of 2)\n;;; Destroy: AF DE HL\nload_patterns:\nIF DEF(PREVIEW_MODE)\n    db $fc ; signal order update to tracker\nENDC\n\n    ld hl, order1\n    ld de, pattern1\n    call .load_pattern\n\n    ld hl, order2\n    call .load_pattern\n\n    ld hl, order3\n    call .load_pattern\n\n    ld hl, order4\n    ;; fallthrough\n\n.load_pattern:\n    ld a, [hl+]\n    add c\n    ld h, [hl]\n    ld l, a\n    adc h\n    sub l\n    ld h, a\n\n    ld a, [hl+]\n    ld [de], a\n    inc de\n    ld a, [hl]\n    ld [de], a\n    inc de\n    ret\n\nIF DEF(GBDK)\n_hUGE_mute_channel::\n    ld b, a\n    ld c, e\nENDC\n\n;;; Sets a channel's muting status.\n;;; Muted channels are left entirely alone by the driver, so that you can repurpose them,\n;;; for example for sound effects, CH3 sample playback, etc.\n;;; If muting the channel, the note being played will be cut.\n;;; Param: B = Which channel to enable; 0 for CH1, 1 for CH2, etc.\n;;; Param: C = 0 to unmute the channel, 1 to mute it\n;;; Destroy: A C E HL\nhUGE_mute_channel::\n    ld e, $fe\n    ld a, b\n    or a\n    jr z, .enable_cut\n.enable_loop:\n    sla c\n    rlc e\n    dec a\n    jr nz, .enable_loop\n.enable_cut:\n    ld a, [mute_channels]\n    and e\n    or  c\n    ld [mute_channels], a\n    and c\n    jp nz, note_cut\n    ret\n\n\n;;; Reads a pattern's current row.\n;;; Param: BC = Pointer to the pattern\n;;; Param: [row] = Index of the current row\n;;; Return: A = Note ID\n;;; Return: B = Instrument (upper nibble) & effect code (lower nibble)\n;;; Return: C = Effect parameter\n;;; Destroy: HL\nget_current_row:\n    ld a, [row]\n.row_in_a:\n    ld h, a\n    ;; Multiply by 3 for the note value\n    add h\n    add h\n\n    ld h, 0\n    ld l, a\n    add hl, bc ; HL now points at the 3rd byte of the note\n    ld a, [hl+]\n    ld b, [hl]\n    inc hl\n    ld c, [hl]\n    ret\n\n;;; Gets the \"period\" of a pattern's current note.\n;;; Param: HL = Pointer to the pattern pointer\n;;; Param: [row] = Index of the current row\n;;; Param: DE = Location to write the note's index to, if applicable\n;;; Return: HL = Note's period\n;;; Return: CF = Set if and only if a \"valid\" note (i.e. not a \"rest\")\n;;; Return: [DE] = Note's ID, not updated if a \"rest\"\n;;; Return: B = Instrument (upper nibble) & effect code (lower nibble)\n;;; Return: C = Effect parameter\n;;; Destroy: AF\nget_current_note:\n    ld a, [hl+]\n    ld c, a\n    ld b, [hl]\n\n    call get_current_row\n    ld hl, 0\n\n    ;; If the note we found is greater than LAST_NOTE, then it's not a valid note\n    ;; and nothing needs to be updated.\n    cp LAST_NOTE\n    ret nc\n\n    ;; Store the loaded note value in channel_noteX\n    ld [de], a\n\n;;; Gets a note's \"period\", i.e. what should be written to NRx3 and NRx4.\n;;; Param: A = Note ID\n;;; Return: HL = Note's period\n;;; Return: CF = 1\n;;; Destroy: AF\nget_note_period:\n    add a ; double it to get index into hi/lo table\n    add LOW(note_table)\n    ld l, a\n    adc HIGH(note_table)\n    sub l\n    ld h, a\n    ld a, [hl+]\n    ld h, [hl]\n    ld l, a\n\n    scf\n    ret\n\n;;; Gets a note's \"polynomial counter\", i.e. what should be written to NR44.\n;;; Param: A = Note ID\n;;; Return: A = Note's poly\n;;; Destroy: F HL\nget_note_poly:\n    ;; Invert the order of the numbers\n    add 192 ; (255 - 63)\n    cpl\n\n    ;; Thanks to RichardULZ for this formula\n    ;; https://docs.google.com/spreadsheets/d/1O9OTAHgLk1SUt972w88uVHp44w7HKEbS/edit#gid=75028951\n    ; if A > 7 then begin\n    ;   B := (A-4) div 4;\n    ;   C := (A mod 4)+4;\n    ;   A := (C or (B shl 4))\n    ; end;\n\n    ; if A < 7 then return\n    cp 7\n    ret c\n\n    ld h, a\n\n    ; B := (A-4) div 4;\n    srl a\n    srl a\n    dec a\n    ld l, a\n\n    ; C := (A mod 4)+4;\n    ld a, h\n    and 3 ; mod 4\n    add 4\n\n    ; A := (C or (B shl 4))\n    swap l\n    or l\n    ret\n\n\n;;; Computes the pointer to a member of a channel.\n;;; Param: B = Which channel (0 = CH1, 1 = CH2, etc.)\n;;; Param: D = Offset within the channel struct\n;;; Return: HL = Pointer to the channel's member\n;;; Destroy: AF\nptr_to_channel_member:\n    ld a, b\n    swap a\n    add d\n    add LOW(channels)\n    ld l, a\n    adc HIGH(channels)\n    sub l\n    ld h, a\n    ret\n\n\n;; TODO: Make this take HL instead of DE\n\n;;; Updates a channel's frequency, and possibly restarts it.\n;;; Note that CH4 is *never* restarted by this!\n;;; Param: B = Which channel to update (0 = CH1, 1 = CH2, etc.)\n;;; Param: (for CH4) E = Note ID\n;;; Param: (otherwise) DE = Note period\n;;; Destroy: AF C\n;;; Destroy: (for CH4) HL\nupdate_channel_freq:\n    ld h, 0\n.nonzero_highmask:\n    ld c, b\n    ld a, [mute_channels]\n    dec c\n    jr z, .update_channel2\n    dec c\n    jr z, .update_channel3\n    dec c\n    jr z, .update_channel4\n\n.update_channel1:\n    retMute 0\n\n    ld a, e\n    ld [channel_period1], a\n    ldh [rAUD1LOW], a\n    ld a, d\n    ld [channel_period1+1], a\n    or h\n    ldh [rAUD1HIGH], a\n    ret\n\n.update_channel2:\n    retMute 1\n\n    ld a, e\n    ld [channel_period2], a\n    ldh [rAUD2LOW], a\n    ld a, d\n    ld [channel_period2+1], a\n    or h\n    ldh [rAUD2HIGH], a\n    ret\n\n.update_channel3:\n    retMute 2\n\n    ld a, e\n    ld [channel_period3], a\n    ldh [rAUD3LOW], a\n    ld a, d\n    ld [channel_period3+1], a\n    or h\n    ldh [rAUD3HIGH], a\n    ret\n\n.update_channel4:\n    retMute 3\n\n    ld d, h\n    ld a, e\n    call get_note_poly\n    ld hl, step_width4\n    or [hl]\n    ldh [rAUD4POLY], a\n\n    ld a, d\n    ldh [rAUD4GO], a\n    ret\n\n\nplay_note_routines:\n    jr play_ch1_note\n    jr play_ch2_note\n    jr play_ch3_note\n    jr play_ch4_note\n\nplay_ch1_note:\n    ld a, [mute_channels]\n    retMute 0\n\n    ;; Play a note on channel 1 (square wave)\n    ld hl, channel_period1\n    ld a, [hl+]\n    ldh [rAUD1LOW], a\n\n    ;; Get the highmask and apply it.\n    ld a, [highmask1]\n    or [hl]\n    ldh [rAUD1HIGH], a\n    ret\n\nplay_ch2_note:\n    ld a, [mute_channels]\n    retMute 1\n\n    ;; Play a note on channel 2 (square wave)\n    ld hl, channel_period2\n    ld a, [hl+]\n    ldh [rAUD2LOW], a\n\n    ;; Get the highmask and apply it.\n    ld a, [highmask2]\n    or [hl]\n    ldh [rAUD2HIGH], a\n    ret\n\nplay_ch3_note:\n    ld a, [mute_channels]\n    retMute 2\n\n    ;; Triggering CH3 while it's reading a byte corrupts wave RAM.\n    ;; To avoid this, we kill the wave channel (0 → NR30), then re-enable it.\n    ;; This way, CH3 will be paused when we trigger it by writing to NR34.\n    ;; TODO: what if `highmask3` bit 7 is not set, though?\n\n    ldh a, [rAUDTERM]\n    push af\n    and %10111011\n    ldh [rAUDTERM], a\n\n    xor a\n    ldh [rAUD3ENA], a\n    cpl\n    ldh [rAUD3ENA], a\n\n    ;; Play a note on channel 3 (waveform)\n    ld hl, channel_period3\n    ld a, [hl+]\n    ldh [rAUD3LOW], a\n\n    ;; Get the highmask and apply it.\n    ld a, [highmask3]\n    or [hl]\n    ldh [rAUD3HIGH], a\n\n    pop af\n    ldh [rAUDTERM], a\n\n    ret\n\nplay_ch4_note:\n    ld a, [mute_channels]\n    retMute 3\n\n    ;; Play a \"note\" on channel 4 (noise)\n    ld a, [channel_period4]\n    ldh [rAUD4POLY], a\n\n    ;; Get the highmask and apply it.\n    ld a, [highmask4]\n    ldh [rAUD4GO], a\n\n    ret\n\n;;; Executes a row of a table.\n;;; Param: BC = Pointer to which table to run\n;;; Param: [HL] = Which row the table is on\n;;; Param: E = Which channel to run the table on\ndo_table:\n    ;; Increment the current row\n    ld a, [hl]\n    inc [hl]\n    push hl\n\n    ;; Grab the cell values, return if no note.\n    ;; Save BC for doing effects.\n    call get_current_row.row_in_a\n    pop hl ; TODO: don't trash HL in the first place\n    push bc\n\n    ld d, a\n\n    ;; If there's a jump, change the current row\n    ld a, b\n    and $F0\n    bit 7, d\n    jr z, .no_steal\n    res 7, d\n    set 0, a\n.no_steal:\n    swap a\n    jr z, .no_jump\n    dec a\n    ld [hl], a\n\n.no_jump:\n    ld a, d\n    ;; If there's no note, don't update channel frequencies\n    cp NO_NOTE\n    jr z, .no_note2\n\n    sub 36 ; bring the number back in the range of -36, +35\n\n    ld b, e\n    ld e, a\n    ld d, 4\n    call ptr_to_channel_member\n    ld a, e\n    add [hl]\n    inc hl\n    ld d, [hl]\n\n    ;; A = note index\n    ;; B = channel\n    ;; D = highmask\n    ;; pushed = instrument/effect\n\n    ;; If ch4, don't get note period (update_channel_freq gets the poly for us)\n    ld e, a\n    inc b\n    bit 2, b\n    ld c, d\n    jr nz, .is_ch4\n\n    call get_note_period\n    ld d, h\n    ld e, l\n.is_ch4:\n    ld h, c\n    res 7, h\n    dec b\n    call update_channel_freq.nonzero_highmask\n\n.no_note:\n    ld e, b\n.no_note2:\n    pop bc\n\n    ld d, 1\n    jr do_effect.no_set_offset\n\n;;; Performs an effect on a given channel.\n;;; Param: E = Channel ID (0 = CH1, 1 = CH2, etc.)\n;;; Param: B = Effect type (upper 4 bits ignored)\n;;; Param: C = Effect parameters (depend on FX type)\n;;; Destroy: AF BC DE HL\ndo_effect:\n    ;; Return immediately if effect is 000\n    ld d, 0\n.no_set_offset:\n    ld a, b\n    and $0F\n    or c\n    ret z\n\n    ;; Strip the instrument bits off leaving only effect code\n    ld a, b\n    and $0F\n    ;; Multiply by 2 to get offset into table\n    add a\n\n    add LOW(.jump)\n    ld l, a\n    adc HIGH(.jump)\n    sub l\n    ld h, a\n\n    ld a, [hl+]\n    ld h, [hl]\n    ld l, a\n    bit 0, d\n    jr z, .no_offset\n    inc hl\n.no_offset:\n    ld b, e\n    ld a, [tick]\n    or a ; We can return right off the bat if it's tick zero\n    jp hl\n\n.jump:\n    ;; Jump table for effect\n    dw fx_arpeggio                     ;0xy\n    dw fx_porta_up                     ;1xy\n    dw fx_porta_down                   ;2xy\n    dw fx_toneporta                    ;3xy\n    dw fx_vibrato                      ;4xy\n    dw fx_set_master_volume            ;5xy ; global\n    dw fx_call_routine                 ;6xy\n    dw fx_note_delay                   ;7xy\n    dw fx_set_pan                      ;8xy ; global\n    dw fx_set_duty                     ;9xy\n    dw fx_vol_slide                    ;Axy\n    dw fx_pos_jump                     ;Bxy ; global\n    dw fx_set_volume                   ;Cxy\n    dw fx_pattern_break                ;Dxy ; global\n    dw fx_note_cut                     ;Exy\n    dw fx_set_speed                    ;Fxy ; global\n\n\n;;; Processes (global) effect 5, \"set master volume\".\n;;; Param: C = Value to write to NR50\n;;; Param: ZF = Set if and only if on tick 0\n;;; Destroy: A\nfx_set_master_volume:\n    ret nz\n\n    ld a, c\n    ldh [rAUDVOL], a\n    ret\n\n\n;;; Processes effect 6, \"call routine\".\n;;; Param: B = Current channel ID (0 = CH1, 1 = CH2, etc.)\n;;; Param: C = Routine ID\n;;; Param: A = Current tick\n;;; Param: ZF = Set if and only if on tick 0\n;;; Destroy: Anything the routine does\nfx_call_routine:\n    nop ; In place of `ret cc`. Allows to be used in subpatterns\n\n    ld hl, routines\n    ld a, $0f\n    and c\n    add a\n    add [hl]\n    ld e, a\n    inc hl\n    ld a, $0\n    adc [hl]\n    ld h, a\n    ld l, e\n\n    ld a, [hl+]\n    ld h, [hl]\n    ld l, a\n\n    ld d, b\n    ld e, c ; SDCC compatibility\n\n    ld a, [tick]\n    or a ; set zero flag if tick 0 for compatibility\n    jp hl\n\n\n;;; Processes (global) effect 8, \"set pan\".\n;;; Param: B = Current channel ID (0 = CH1, 1 = CH2, etc.)\n;;; Param: C = Value to write to NR51\n;;; Param: ZF = Set if and only if on tick 0\n;;; Destroy: A\nfx_set_pan:\n    ret nz\n\n    ;; Pretty simple. The editor can create the correct value here without a bunch\n    ;; of bit shifting manually.\n    ld a, c\n    ldh [rAUDTERM], a\n    ret\n\n\n;;; Processes effect 9, \"set duty cycle\".\n;;; Param: B = Current channel ID (0 = CH1, anything else = CH2)\n;;; Param: C = Value to write to NRx1\n;;; Param: ZF = Set if and only if on tick 0\n;;; Destroy: AF\nfx_set_duty:\n    ret nz\n\n    ;; $900 = 12.5%\n    ;; $940 = 25%\n    ;; $980 = 50%\n    ;; $9C0 = 75%\n\n    ld a, [mute_channels]\n    dec b\n    jr z, .chan2\n    dec b\n    jr z, .chan3\n    dec b\n    jr z, .chan4\n.chan1:\n    retMute 0\n    ld a, c\n    ldh [rAUD1LEN], a\n    ret\n.chan2:\n    retMute 1\n    ld a, c\n    ldh [rAUD2LEN], a\n    ret\n.chan4:\n    retMute 3\n    ldh a, [rAUD4POLY]\n    res 3, a\n    or c\n    ldh [rAUD4POLY], a\n    ret\n.chan3:\n    retMute 2\n\n    ld a, c\n    ld hl, current_wave\n    call update_ch3_waveform\n\n    ld b, 2\n    jp play_note\n\nupdate_ch3_waveform:\n    ld [hl], a\n    ;; Get pointer to new wave\n    swap a\n    ld hl, waves\n    add [hl]\n    inc hl\n    ld h, [hl]\n    ld l, a\n    adc h\n    sub l\n    ld h, a\n\n    ldh a, [rAUDTERM]\n    push af\n    and %10111011\n    ldh [rAUDTERM], a\n\n    xor a\n    ldh [rAUD3ENA], a\n\nFOR OFS, 16\n    ld a, [hl+]\n    ldh [_AUD3WAVERAM + OFS], a\nENDR\n\n    ld a, %10000000\n    ldh [rAUD3ENA], a\n\n    pop af\n    ldh [rAUDTERM], a\n\n    ret\n\n;;; Processes (global) effect F, \"set speed\".\n;;; Param: C = New amount of ticks per row\n;;; Param: ZF = Set if and only if on tick 0\n;;; Destroy: A\nfx_set_speed:\n    ret nz\n\n    ld a, c\n    ld [ticks_per_row], a\n    ret\n\n\nIF DEF(GBDK)\n_hUGE_set_position::\n    ld c, a\n    xor a\nENDC\n\nhUGE_set_position::\n;;; Processes (global) effect B, \"position jump\".\n;;; Param: C = ID of the order to jump to\n;;; Destroy: A\nfx_pos_jump:\n    ret nz\n\n    ld hl, row_break\n\n    or [hl] ; a = 0 since we know we're on tick 0\n    jr nz, .already_broken\n    ld [hl], 1\n.already_broken:\n    inc hl\n    ld [hl], c\n    ret\n\n\n;;; Processes (global) effect D, \"pattern break\".\n;;; Param: C = ID of the next order's row to start on\n;;; Destroy: A\nfx_pattern_break:\n    ret nz\n\n    ld a, c\n    ld [row_break], a\n    ret\n\n\n;;; Processes effect E, \"note cut\".\n;;; Param: B = Current channel ID (0 = CH1, 1 = CH2, etc.)\n;;; Param: C = Tick to cut the note on\n;;; Param: A = Current tick\n;;; Destroy: A\nfx_note_cut:\n    cp c\n    ret nz\n\n    ;; check channel mute\n\n    ld a, b\n    ;; 0 → $01, 1 → $02, 2 → $04, 3 → $05\n    ;; Overall, these two instructions add 1 to the number.\n    ;; However, the first instruction will generate a carry for inputs of $02 and $03;\n    ;; the `adc` will pick the carry up, and \"separate\" 0 / 1 from 2 / 3 by an extra 1.\n    ;; Luckily, this yields correct results for 0 ($01), 1 ($02), and 2 ($03 + 1 = $04).\n    ;; We'll see about fixing 3 afterwards.\n    add -2\n    adc 3\n    ;; After being shifted left, the inputs are $02, $04, $08 and $0A; all are valid BCD,\n    ;; except for $0A. Since we just performed `add a`, DAA will correct the latter to $10.\n    ;; (This should be correctly emulated everywhere, since the inputs are identical to\n    ;; \"regular\" BCD.)\n    ;; When shifting the results back, we'll thus get $01, $02, $04 and $08!\n    add a\n    daa\n    rra\n    ld d, a\n    ld a, [mute_channels]\n    cpl\n    and d\n    ret z\n\n    ;; fallthrough\n\n\n;;; Cuts note on a channel.\n;;; Param: B = Current channel ID (0 = CH1, 1 = CH2, etc.)\n;;; Destroy: AF HL\nnote_cut:\n    ld a, b\n    add a\n    add a\n    add b ; multiply by 5\n    add LOW(rAUD1ENV)\n    ld l, a\n    ld h, HIGH(rAUD1ENV)\n    xor a\n    ld [hl+], a\n    ld a, b\n    cp 2\n    ret z ; return early if CH3-- no need to retrigger note\n\n    ;; Retrigger note\n    inc l ; Not `inc hl` because H stays constant (= $FF)\n    ld [hl], $FF\n    ret\n\n\n;;; Processes effect C, \"set volume\".\n;;; Param: B = Current channel ID (0 = CH1, 1 = CH2, etc.)\n;;; Param: C = Volume to set the channel to\n;;; Param: ZF = Set if and only if on tick 0\n;;; Destroy: AF BC\nfx_set_volume:\n    ret nz ; Return if we're not on tick zero.\n\n    swap c\n    ld a, [mute_channels]\n    dec b\n    jr z, .set_chn_2_vol\n    dec b\n    jr z, .set_chn_3_vol\n    dec b\n    jr z, .set_chn_4_vol\n\n.set_chn_1_vol:\n    retMute 0\n\n    ldh a, [rAUD1ENV]\n    and %00001111\n    or c\n    ldh [rAUD1ENV], a\n    jp play_ch1_note\n\n.set_chn_2_vol:\n    retMute 1\n\n    ldh a, [rAUD2ENV]\n    and %00001111\n    or c\n    ldh [rAUD2ENV], a\n    jp play_ch2_note\n\n.set_chn_3_vol:\n    retMute 2\n\n    ;; \"Quantize\" the more finely grained volume control down to one of 4 values.\n    ld a, c\n    cp 10 << 4\n    jr nc, .one\n    cp 5 << 4\n    jr nc, .two\n    or a\n    jr z, .done ; Zero maps to zero\n.three:\n    ld a, %01100000\n    jr .done\n.two:\n    ld a, %01000000\n    jr .done\n.one:\n    ld a, %00100000\n.done:\n    ldh [rAUD3LEVEL], a\n    ret\n\n.set_chn_4_vol:\n    retMute 3\n\n    ld a, c\n    ldh [rAUD4ENV], a\n    jp play_ch4_note\n\n\n;;; Processes effect 4, \"vibrato\".\n;;; Param: B = Current channel ID (0 = CH1, 1 = CH2, etc.)\n;;; Param: C = FX param\n;;; Param: ZF = Set if and only if on tick 0\n;;; Destroy: AF B DE HL\nfx_vibrato:\n    ret z\n\n    ;; Extremely poor man's vibrato.\n    ;; Speed values:\n    ;; (0x0  = 1.0)\n    ;; (0x1  = 0.5)\n    ;; (0x3  = 0.25)\n    ;; (0x7  = 0.125)\n    ;; (0xf  = 0.0625)\n    ld d, 4\n    call ptr_to_channel_member\n\n    ld a, c\n    and %11110000\n    swap a\n    ld e, a\n\n    ld a, [counter]\n    and e\n    ld a, [hl]\n    jr z, .go_up\n.restore:\n    call get_note_period\n    ld d, h\n    ld e, l\n    jr .finish_vibrato\n.go_up:\n    call get_note_period\n    ld a, c\n    and %00001111\n    add l\n    ld e, a\n    adc h\n    sub e\n    ld d, a\n.finish_vibrato:\n    jp update_channel_freq\n\n\n;;; Processes effect 0, \"arpeggio\".\n;;; Param: B = Current channel ID (0 = CH1, 1 = CH2, etc.)\n;;; Param: C = Offsets in semitones (each nibble)\n;;; Param: ZF = Set if and only if on tick 0\n;;; Destroy: AF B DE HL\nfx_arpeggio:\n    nop ; In place of `ret cc`. Allows to be used in subpatterns\n\n    ld d, 4\n    call ptr_to_channel_member\n    ld d, [hl]\n\n    ld a, [counter]\n    dec a\n\n    ;; TODO: A crappy modulo, because it's not a multiple of four :(\n\n    jr .test_greater_than_two\n.greater_than_two:\n    sub 3\n.test_greater_than_two:\n    cp 3\n    jr nc, .greater_than_two\n\n    ;; Multiply by 2 to get offset into table\n    add a\n\n    add LOW(.arp_options)\n    ld l, a\n    adc HIGH(.arp_options)\n    sub l\n    ld h, a\n    jp hl\n\n.arp_options:\n    jr .set_arp1\n    jr .set_arp2\n    ;; No `jr .reset_arp`\n\n.reset_arp:\n    ld a, d\n    jr .finish_skip_add\n\n.set_arp2:\n    ld a, c\n    swap a\n    db $FE ; cp <imm8> gobbles next byte\n\n.set_arp1:\n    ld a, c\n.finish_arp:\n    and %00001111\n    add d\n.finish_skip_add:\n    call get_note_period\n    ld d, h\n    ld e, l\n    jp update_channel_freq\n\n\n;;; Processes effect 1, \"portamento up\".\n;;; Param: B = Current channel ID (0 = CH1, 1 = CH2, etc.)\n;;; Param: C = How many units to slide the pitch by per tick\n;;; Param: ZF = Set if and only if on tick 0\n;;; Destroy: A B DE HL\nfx_porta_up:\n    ret z\n\n    ld d, 0\n    call ptr_to_channel_member\n\n    ;; Add C to 16-bit value at HL\n    ld a, [hl+]\n    add c\n    ld e, a\n    adc [hl]\n    sub e\n    ld d, a\n\n    jp update_channel_freq\n\n\n;;; Processes (global) effect 2, \"portamento down\".\n;;; Param: B = Current channel ID (0 = CH1, 1 = CH2, etc.)\n;;; Param: C = How many units to slide the pitch down by per tick\n;;; Param: ZF = Set if and only if on tick 0\n;;; Destroy: A B DE HL\nfx_porta_down:\n    ret z\n\n    ld d, 0\n    call ptr_to_channel_member\n\n    ;; Subtract C from 16-bit value at [HL]\n    ld a, [hl+]\n    sub c\n    ld e, a\n    sbc a\n    add [hl]\n    ld d, a\n\n    jp update_channel_freq\n\n\n;;; Processes effect 2, \"tone portamento\".\n;;; Param: B = Current channel ID (0 = CH1, 1 = CH2, etc.)\n;;; Param: C = Target note\n;;; Param: ZF = Set if and only if on tick 0\n;;; Destroy: A B DE HL\nfx_toneporta:\n    jr z, .setup\n\n    ld d, 0\n    call ptr_to_channel_member\n    push hl\n\n    ld a, [hl+]\n    ld e, a\n    ld a, [hl+]\n    ld d, a\n\n    ld a, [hl+]\n    ld h, [hl]\n    ld l, a\n\n    ;; Comparing which direction to move the current value\n    ;; TODO: Optimize this!!!!\n\n    ;; Compare high byte\n    ld a, h\n\n    cp d\n    jr c, .subtract ; target is less than the current period\n    jr nz, .add\n.high_byte_same:\n    ld a, l\n    cp e\n    jr c, .subtract ; the target is less than the current period\n    jr z, .done ; both nibbles are the same so no portamento\n.add:\n    ld a, c\n    add_a_to_r16 de\n\n    ld a, h\n    cp d\n    jr c, .set_exact\n    jr nz, .done\n    ld a, l\n    cp e\n    jr c, .set_exact\n\n    jr .done\n\n.subtract:\n    sub_from_r16 d, e, c\n\n    bit 7, d ; check for overflow\n    jr nz, .set_exact\n\n    ld a, d\n    cp h\n    jr c, .set_exact\n    jr nz, .done\n    ld a, e\n    cp l\n    jr c, .set_exact\n\n    jr .done\n.set_exact:\n    ld d, h\n    ld e, l\n.done:\n\n    pop hl\n    ld a, e\n    ld [hl+], a\n    ld [hl], d\n\n\n    ld a, 4\n    add_a_to_r16 hl\n\n    ld a, [hl]\n    res 7, [hl]\n    ld h, a\n    ;; B must be preserved for this\n    jp update_channel_freq.nonzero_highmask\n\n.setup:\n    ;; We're on tick zero, so load the note period into the toneporta target.\n    ld d, 4\n    call ptr_to_channel_member\n\n    ld a, [hl-]\n    ld d, h\n    ld e, l\n    call get_note_period\n    ld a, h\n    ld [de], a\n    dec de\n    ld a, l\n    ld [de], a\n\nret_dont_play_note:\n    ;; Don't call play_chX_note. This is done by popping the saved AF register and clearing\n    ;; the C flag, which relies on the way the caller is implemented!!\n    pop hl\n    pop af\n    and a ; Clear carry to avoid calling `play_chX_note`\n    push af\n    jp hl\n\n\n;;; Processes effect A, \"volume slide\".\n;;; Param: B = Current channel ID (0 = CH1, 1 = CH2, etc.)\n;;; Param: C = FX param; either nibble should be 0, otherwise weird (unspecified) behavior may arise\n;;; Param: ZF = Set if and only if on tick 0\n;;; Destroy: AF C DE HL\nfx_vol_slide:\n    ret nz\n\n    ;; This is really more of a \"retrigger note with lower volume\" effect and thus\n    ;; isn't really that useful. Instrument envelopes should be used instead.\n    ;; Might replace this effect with something different if a new effect is\n    ;; ever needed.\n\n    ;; check channel mute\n\n    ld a, b\n    ;; 0 → $01, 1 → $02, 2 → $04, 3 → $05\n    ;; Overall, these two instructions add 1 to the number.\n    ;; However, the first instruction will generate a carry for inputs of $02 and $03;\n    ;; the `adc` will pick the carry up, and \"separate\" 0 / 1 from 2 / 3 by an extra 1.\n    ;; Luckily, this yields correct results for 0 ($01), 1 ($02), and 2 ($03 + 1 = $04).\n    ;; We'll see about fixing 3 afterwards.\n    add -2\n    adc 3\n    ;; After being shifted left, the inputs are $02, $04, $08 and $0A; all are valid BCD,\n    ;; except for $0A. Since we just performed `add a`, DAA will correct the latter to $10.\n    ;; (This should be correctly emulated everywhere, since the inputs are identical to\n    ;; \"regular\" BCD.)\n    ;; When shifting the results back, we'll thus get $01, $02, $04 and $08!\n    add a\n    daa\n    rra\n    ld d, a\n    ld a, [mute_channels]\n    cpl\n    and d\n    ret z\n\n    ;; setup the up and down params\n    ld a, c\n    and %00001111\n    ld d, a\n\n    ld a, c\n    and %11110000\n    ld e, a\n    swap e\n\n    ; There are 5 bytes between each envelope register\n    ld a, b\n    add a\n    add a\n    add b\n    add LOW(rAUD1ENV)\n    ld c, a\n\n    ldh a, [c]\n    and %11110000\n    swap a\n    sub d\n    jr nc, .cont1\n    xor a\n.cont1:\n    add e\n    cp $10\n    jr c, .cont2\n    ld a, $F\n.cont2:\n    swap a\n    ldh [c], a\n\n    ; Go to rAUDxGO, which is 2 bytes after\n    inc c\n    inc c\n    ldh a, [c]\n    or %10000000\n    ldh [c], a\n\n    jr play_note\n\n\n;;; Processes effect 7, \"note delay\".\n;;; Param: B = Current channel ID (0 = CH1, 1 = CH2, etc.)\n;;; Param: C = Amount of ticks by which to delay the note\n;;;            Caveats: 0 never plays the note, and a delay longer than a row's duration skips the note entirely\n;;; Param: ZF = Set if and only if on tick 0\n;;; Destroy: AF D HL\nfx_note_delay:\n    jr z, ret_dont_play_note\n\n    cp c\n    ret nz ; wait until the correct tick to play the note\n\n    ;; fallthrough\n\n\n;;; Plays a channel's current note.\n;;; Param: B = Which channel (0 = CH1, 1 = CH2, etc.)\n;;; Destroy: AF D HL\nplay_note:\n    ld a, b\n    add a\n    add LOW(play_note_routines)\n    ld l, a\n    adc HIGH(play_note_routines)\n    sub l\n    ld h, a\n    jp hl\n\n\n;;; Computes the pointer to an instrument.\n;;; Param: B = The instrument's ID\n;;; Param: HL = Instrument pointer table\n;;; Return: HL = Pointer to the instrument\n;;; Return: ZF = Set if and only if there was no instrument (ID == 0)\n;;; Destroy: AF\nsetup_instrument_pointer:\n    ld a, b\n    and %11110000\n    swap a\n    ret z ; If there's no instrument, then return early.\n\n    dec a ; Instrument 0 is \"no instrument\"\n.finish:\n    ;; Multiply by 6\n    add a\n    ld e, a\n    add a\n    add e\n\n    add_a_to_r16 hl\n\n    rla ; reset the Z flag\n    ret\n\n_hUGE_dosound::\n;;; Ticks the sound engine once.\n;;; Destroy: AF BC DE HL\nhUGE_dosound::\n    ld a, [tick]\n    or a\n    jp nz, process_effects\n\n    ;; Note playback\n    ld hl, pattern1\n    ld de, channel_note1\n    call get_current_note\n\n    push af ; Save carry for conditonally calling note\n    jr nc, .do_setvol1\n\n    ld a, b\n    and $0F\n    cp 3 ; If toneporta, don't load the channel period\n    jr z, .toneporta\n    ld a, l\n    ld [channel_period1], a\n    ld a, h\n    ld [channel_period1+1], a\n.toneporta:\n\n    ld hl, duty_instruments\n    ld a, [hl+]\n    ld h, [hl]\n    ld l, a\n    call setup_instrument_pointer\n    ld a, [highmask1]\n    res 7, a ; Turn off the \"initial\" flag\n    jr z, .write_mask1\n\n    checkMute 0, .do_setvol1\n\n    ld a, [hl+]\n    ldh [rAUD1SWEEP], a\n    ld a, [hl+]\n    ldh [rAUD1LEN], a\n    ld a, [hl+]\n    ldh [rAUD1ENV], a\n    ld a, [hl+]\n    ld [table1], a\n    ld a, [hl+]\n    ld [table1+1], a\n    xor a\n    ld [table_row1], a\n\n    ld a, [hl]\n\n.write_mask1:\n    ld [highmask1], a\n\n.do_setvol1:\n    ld e, 0\n    call do_effect\n\n    pop af\n    call c, play_ch1_note\n\n    ld a, [table1]\n    ld c, a\n    ld a, [table1+1]\n    ld b, a\n    or c\n    ld hl, table_row1\n    ld e, 0\n    call nz, do_table\n\nprocess_ch2:\n    ;; Note playback\n    ld hl, pattern2\n    ld de, channel_note2\n    call get_current_note\n\n    push af ; Save carry for conditonally calling note\n    jr nc, .do_setvol2\n\n    ld a, b\n    and $0F\n    cp 3 ; If toneporta, don't load the channel period\n    jr z, .toneporta\n    ld a, l\n    ld [channel_period2], a\n    ld a, h\n    ld [channel_period2+1], a\n.toneporta:\n\n    ld hl, duty_instruments\n    ld a, [hl+]\n    ld h, [hl]\n    ld l, a\n    call setup_instrument_pointer\n    ld a, [highmask2]\n    res 7, a ; Turn off the \"initial\" flag\n    jr z, .write_mask2\n\n    checkMute 1, .do_setvol2\n\n    inc hl\n\n    ld a, [hl+]\n    ldh [rAUD2LEN], a\n    ld a, [hl+]\n    ldh [rAUD2ENV], a\n    ld a, [hl+]\n    ld [table2], a\n    ld a, [hl+]\n    ld [table2+1], a\n    xor a\n    ld [table_row2], a\n\n    ld a, [hl]\n\n.write_mask2:\n    ld [highmask2], a\n\n.do_setvol2:\n    ld e, 1\n    call do_effect\n\n    pop af\n    call c, play_ch2_note\n\n    ld a, [table2]\n    ld c, a\n    ld a, [table2+1]\n    ld b, a\n    or c\n    ld hl, table_row2\n    ld e, 1\n    call nz, do_table\n\nprocess_ch3:\n    ld hl, pattern3\n    ld de, channel_note3\n    call get_current_note\n\n    push af ; Save carry for conditonally calling note\n    jp nc, .do_setvol3\n\n    ld a, b\n    and $0F\n    cp 3 ; If toneporta, don't load the channel period\n    jr z, .toneporta\n    ld a, l\n    ld [channel_period3], a\n    ld a, h\n    ld [channel_period3+1], a\n.toneporta:\n\n    ld hl, wave_instruments\n    ld a, [hl+]\n    ld h, [hl]\n    ld l, a\n    call setup_instrument_pointer\n    ld a, [highmask3]\n    res 7, a ; Turn off the \"initial\" flag\n    jr z, .write_mask3\n\n    checkMute 2, .do_setvol3\n\n    ld a, [hl+]\n    ldh [rAUD3LEN], a\n    ld a, [hl+]\n    ldh [rAUD3LEVEL], a\n    ld a, [hl+]\n    push hl\n\n    ;; Check to see if we need to copy the wave\n    ld hl, current_wave\n    cp [hl]\n    jr z, .no_wave_copy\n    call update_ch3_waveform\n\n.no_wave_copy:\n    pop hl\n    ld a, [hl+]\n    ld [table3], a\n    ld a, [hl+]\n    ld [table3+1], a\n    xor a\n    ld [table_row3], a\n\n    ld a, [hl]\n\n.write_mask3:\n    ld [highmask3], a\n\n.do_setvol3:\n    ld e, 2\n    call do_effect\n\n    pop af\n    call c, play_ch3_note\n\n    ld a, [table3]\n    ld c, a\n    ld a, [table3+1]\n    ld b, a\n    or c\n    ld hl, table_row3\n    ld e, 2\n    call nz, do_table\n\nprocess_ch4:\n    ld hl, pattern4\n    ld a, [hl+]\n    ld c, a\n    ld b, [hl]\n    call get_current_row\n    cp LAST_NOTE\n\n    push af ; Save carry for conditonally calling note\n    jr nc, .do_setvol4\n\n    ld [channel_note4], a\n\n    ;; No toneporta check because it's not supported for CH4 anyway\n\n    call get_note_poly\n    ld [channel_period4], a\n\n    ld hl, noise_instruments\n    ld a, [hl+]\n    ld h, [hl]\n    ld l, a\n    call setup_instrument_pointer\n\n    ld a, [highmask4]\n    res 7, a ; Turn off the \"initial\" flag\n    jr z, .write_mask4\n\n    checkMute 3, .do_setvol4\n\n    ld a, [hl+]\n    ldh [rAUD4ENV], a\n\n    ld a, [hl+]\n    ld [table4], a\n    ld a, [hl+]\n    ld [table4+1], a\n    xor a\n    ld [table_row4], a\n\n    ld a, [hl]\n    and %00111111\n    ldh [rAUD4LEN], a\n\n    ld a, [channel_period4]\n    ld d, a\n    ld a, [hl]\n    and %10000000\n    swap a\n    ld [step_width4], a\n    or d\n    ld [channel_period4], a\n\n    ld a, [hl]\n    and %01000000\n    or  %10000000\n.write_mask4:\n    ld [highmask4], a\n\n.do_setvol4:\n    ld e, 3\n    call do_effect\n\n    pop af\n    call c, play_ch4_note\n\n    ld a, [table4]\n    ld c, a\n    ld a, [table4+1]\n    ld b, a\n    or c\n    ld hl, table_row4\n    ld e, 3\n    call nz, do_table\n\n    ;; finally just update the tick/order/row values\n    jp tick_time\n\nprocess_effects:\n    ;; Only do effects if not on tick zero\n    checkMute 0, .after_effect1\n\n    ld hl, pattern1\n    ld a, [hl+]\n    ld c, a\n    ld b, [hl]\n    call get_current_row\n\n    ld a, c\n    or a\n    jr z, .after_effect1\n\n    ld e, 0\n    call do_effect      ; make sure we never return with ret_dont_play_note!!\n\n;; TODO: Deduplicate this code by moving it into do_table?\n.after_effect1:\n    ld a, [table1]\n    ld c, a\n    ld a, [table1+1]\n    ld b, a\n    or c\n    ld hl, table_row1\n    ld e, 0\n    call nz, do_table\n\n.process_ch2:\n    checkMute 1, .after_effect2\n\n    ld hl, pattern2\n    ld a, [hl+]\n    ld c, a\n    ld b, [hl]\n    call get_current_row\n\n    ld a, c\n    or a\n    jr z, .after_effect2\n\n    ld e, 1\n    call do_effect      ; make sure we never return with ret_dont_play_note!!\n\n.after_effect2:\n    ld a, [table2]\n    ld c, a\n    ld a, [table2+1]\n    ld b, a\n    or c\n    ld hl, table_row2\n    ld e, 1\n    call nz, do_table\n\n.process_ch3:\n    checkMute 2, .after_effect3\n\n    ld hl, pattern3\n    ld a, [hl+]\n    ld c, a\n    ld b, [hl]\n    call get_current_row\n\n    ld a, c\n    or a\n    jr z, .after_effect3\n\n    ld e, 2\n    call do_effect      ; make sure we never return with ret_dont_play_note!!\n\n.after_effect3:\n    ld a, [table3]\n    ld c, a\n    ld a, [table3+1]\n    ld b, a\n    or c\n    ld hl, table_row3\n    ld e, 2\n    call nz, do_table\n\n.process_ch4:\n    checkMute 3, .after_effect4\n\n    ld hl, pattern4\n    ld a, [hl+]\n    ld c, a\n    ld b, [hl]\n    call get_current_row\n\n    ld a, c\n    or a\n    jr z, .after_effect4\n\n    ld e, 3\n    call do_effect      ; make sure we never return with ret_dont_play_note!!\n\n.after_effect4:\n    ld a, [table4]\n    ld c, a\n    ld a, [table4+1]\n    ld b, a\n    or c\n    ld hl, table_row4\n    ld e, 3\n    call nz, do_table\n\ntick_time:\nIF DEF(PREVIEW_MODE)\n    db $f4\nENDC\n    ld hl, counter\n    inc [hl]\n\n    assert counter + 1 == tick\n    inc hl ; ld hl, tick\n    inc [hl] ; Increment tick counter\n\n    ;; Should we switch to the next row?\n    ld a, [ticks_per_row]\n    sub [hl]\n    ret nz ; Nope.\n    ld [hl+], a ; Reset tick to 0\n    ;; Below code relies on a == 0\n\n    assert tick + 1 == row_break\n    ;; Check if we need to perform a row break or pattern break\n    or [hl] ; a == 0, so this is `ld a, [hl]` that also alters flags\n    jr z, .no_break\n\n    ;; These are offset by one so we can check to see if they've\n    ;; been modified\n    dec a\n    ld b, a\n\n    xor a\n    ld [hl+], a\n    assert row_break + 1 == next_order\n    or [hl]     ; a = [next_order], zf = ([next_order] == 0)\n    jr z, .neworder\n    ld [hl], 0\n\n    dec a\n    add a ; multiply order by 2 (they are words)\n\n    jr .update_current_order\n\n.no_break:\n    ;; Increment row.\n    ld a, [row]\n    inc a\n    cp PATTERN_LENGTH\n    jr nz, .noreset\n\n    ld b, 0\n.neworder:\nIF DEF(PREVIEW_MODE)\n    ld a, [loop_order]\n    and a\n    jr z, .no_loop_order\n    xor a\n    jr .noreset\n.no_loop_order:\nENDC\n    ;; Increment order and change loaded patterns\n    ld a, [order_cnt]\n    ld c, a\n    ld a, [current_order]\n    add 2\n    cp c\n    jr nz, .update_current_order\n    xor a\n.update_current_order:\n    ;; Call with:\n    ;; A: The order to load\n    ;; B: The row for the order to start on\n    ld [current_order], a\n    ld c, a\n    call load_patterns\n\n    ld a, b\n.noreset:\n    ld [row], a\n\nIF DEF(PREVIEW_MODE)\n    db $fd ; signal row update to tracker\nENDC\n    ret\n\nnote_table:\ninclude \"include/hUGE_note_table.inc\"\n");

/***/ }),

/***/ 83810:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("MACRO dn ;; (note, instr, effect)\n    db (\\1 | ((\\2 & %00010000) << 3))\n    db (((\\2 << 4) & $FF) | (\\3 >> 8))\n    db LOW(\\3)\nENDM\n\nC_3 EQU 0\nC#3 EQU 1\nD_3 EQU 2\nD#3 EQU 3\nE_3 EQU 4\nF_3 EQU 5\nF#3 EQU 6\nG_3 EQU 7\nG#3 EQU 8\nA_3 EQU 9\nA#3 EQU 10\nB_3 EQU 11\nC_4 EQU 12\nC#4 EQU 13\nD_4 EQU 14\nD#4 EQU 15\nE_4 EQU 16\nF_4 EQU 17\nF#4 EQU 18\nG_4 EQU 19\nG#4 EQU 20\nA_4 EQU 21\nA#4 EQU 22\nB_4 EQU 23\nC_5 EQU 24\nC#5 EQU 25\nD_5 EQU 26\nD#5 EQU 27\nE_5 EQU 28\nF_5 EQU 29\nF#5 EQU 30\nG_5 EQU 31\nG#5 EQU 32\nA_5 EQU 33\nA#5 EQU 34\nB_5 EQU 35\nC_6 EQU 36\nC#6 EQU 37\nD_6 EQU 38\nD#6 EQU 39\nE_6 EQU 40\nF_6 EQU 41\nF#6 EQU 42\nG_6 EQU 43\nG#6 EQU 44\nA_6 EQU 45\nA#6 EQU 46\nB_6 EQU 47\nC_7 EQU 48\nC#7 EQU 49\nD_7 EQU 50\nD#7 EQU 51\nE_7 EQU 52\nF_7 EQU 53\nF#7 EQU 54\nG_7 EQU 55\nG#7 EQU 56\nA_7 EQU 57\nA#7 EQU 58\nB_7 EQU 59\nC_8 EQU 60\nC#8 EQU 61\nD_8 EQU 62\nD#8 EQU 63\nE_8 EQU 64\nF_8 EQU 65\nF#8 EQU 66\nG_8 EQU 67\nG#8 EQU 68\nA_8 EQU 69\nA#8 EQU 70\nB_8 EQU 71\nLAST_NOTE EQU 72\n___ EQU 90 ; the default \"no note\" value\nNO_NOTE EQU ___");

/***/ }),

/***/ 80292:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (";; hUGETracker note table.\n;; Written by SuperDisk 2019\n\n;; Gameboy sound frequences are represented as 11 byte periods.\n;; this note table was generated from http://www.devrs.com/gb/files/sndtab.html\n\ndw 44\ndw 156\ndw 262\ndw 363\ndw 457\ndw 547\ndw 631\ndw 710\ndw 786\ndw 854\ndw 923\ndw 986\ndw 1046\ndw 1102\ndw 1155\ndw 1205\ndw 1253\ndw 1297\ndw 1339\ndw 1379\ndw 1417\ndw 1452\ndw 1486\ndw 1517\ndw 1546\ndw 1575\ndw 1602\ndw 1627\ndw 1650\ndw 1673\ndw 1694\ndw 1714\ndw 1732\ndw 1750\ndw 1767\ndw 1783\ndw 1798\ndw 1812\ndw 1825\ndw 1837\ndw 1849\ndw 1860\ndw 1871\ndw 1881\ndw 1890\ndw 1899\ndw 1907\ndw 1915\ndw 1923\ndw 1930\ndw 1936\ndw 1943\ndw 1949\ndw 1954\ndw 1959\ndw 1964\ndw 1969\ndw 1974\ndw 1978\ndw 1982\ndw 1985\ndw 1988\ndw 1992\ndw 1995\ndw 1998\ndw 2001\ndw 2004\ndw 2006\ndw 2009\ndw 2011\ndw 2013\ndw 2015");

/***/ }),

/***/ 10727:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (";*\n;* Gameboy Hardware definitions\n;*\n;* Based on Jones' hardware.inc\n;* And based on Carsten Sorensen's ideas.\n;*\n;* Rev 1.1 - 15-Jul-97 : Added define check\n;* Rev 1.2 - 18-Jul-97 : Added revision check macro\n;* Rev 1.3 - 19-Jul-97 : Modified for RGBASM V1.05\n;* Rev 1.4 - 27-Jul-97 : Modified for new subroutine prefixes\n;* Rev 1.5 - 15-Aug-97 : Added _HRAM, PAD, CART defines\n;*                     :  and Nintendo Logo\n;* Rev 1.6 - 30-Nov-97 : Added rDIV, rTIMA, rTMA, & rTAC\n;* Rev 1.7 - 31-Jan-98 : Added _SCRN0, _SCRN1\n;* Rev 1.8 - 15-Feb-98 : Added rSB, rSC\n;* Rev 1.9 - 16-Feb-98 : Converted I/O registers to $FFXX format\n;* Rev 2.0 -           : Added GBC registers\n;* Rev 2.1 -           : Added MBC5 & cart RAM enable/disable defines\n;* Rev 2.2 -           : Fixed NR42,NR43, & NR44 equates\n;* Rev 2.3 -           : Fixed incorrect _HRAM equate\n;* Rev 2.4 - 27-Apr-13 : Added some cart defines (AntonioND)\n;* Rev 2.5 - 03-May-15 : Fixed format (AntonioND)\n;* Rev 2.6 - 09-Apr-16 : Added GBC OAM and cart defines (AntonioND)\n;* Rev 2.7 - 19-Jan-19 : Added rPCMXX (ISSOtm)\n;* Rev 2.8 - 03-Feb-19 : Added audio registers flags (Álvaro Cuesta)\n;* Rev 2.9 - 28-Feb-20 : Added utility rP1 constants\n;* Rev 3.0 - 27-Aug-20 : Register ordering, byte-based sizes, OAM additions, general cleanup (Blitter Object)\n;* Rev 4.0 - 03-May-21 : Updated to use RGBDS 0.5.0 syntax, changed IEF_LCDC to IEF_STAT (Eievui)\n;* Rev 4.1 - 16-Aug-21 : Added more flags, bit number defines, and offset constants for OAM and window positions (rondnelson99)\n;* Rev 4.2 - 04-Sep-21 : Added CH3- and CH4-specific audio registers flags (ISSOtm)\n;* Rev 4.3 - 07-Nov-21 : Deprecate VRAM address constants (Eievui)\n;* Rev 4.4 - 11-Jan-22 : Deprecate VRAM CART_SRAM_2KB constant (avivace)\n;* Rev 4.5 - 03-Mar-22 : Added bit number definitions for OCPS, BCPS and LCDC (sukus)\n;* Rev 4.6 - 15-Jun-22 : Added MBC3 registers and special values\n;* Rev 4.7.0 - 27-Jun-22 : Added alternate names for some constants\n;* Rev 4.7.1 - 05-Jul-22 : Added RPB_LED_ON constant\n\n; NOTE: REVISION NUMBER CHANGES MUST BE REFLECTED\n; IN `rev_Check_hardware_inc` BELOW!\n\nIF __RGBDS_MAJOR__ == 0 && __RGBDS_MINOR__ < 5\n    FAIL \"This version of 'hardware.inc' requires RGBDS version 0.5.0 or later.\"\nENDC\n\n; If all of these are already defined, don't do it again.\n\n    IF !DEF(HARDWARE_INC)\nDEF HARDWARE_INC EQU 1\n\n; Usage: rev_Check_hardware_inc <min_ver>\n; Examples: rev_Check_hardware_inc 4.1.2\n;           rev_Check_hardware_inc 4.1 (equivalent to 4.1.0)\n;           rev_Check_hardware_inc 4 (equivalent to 4.0.0)\nMACRO rev_Check_hardware_inc\n    DEF CUR_VER equs \"4,7,1\"    ; ** UPDATE THIS LINE WHEN CHANGING THE REVISION NUMBER **\n    DEF MIN_VER equs STRRPL(\"\\1\", \".\", \",\")\n    DEF INTERNAL_CHK equs \"\"\"MACRO ___internal\n    IF \\\\1 != \\\\4 || \\\\2 < \\\\5 || (\\\\2 == \\\\5 && \\\\3 < \\\\6)\n        FAIL \"Version \\\\1.\\\\2.\\\\3 of 'hardware.inc' is incompatible with requested version \\\\4.\\\\5.\\\\6\"\n    ENDC\n\\nENDM\"\"\"\n    INTERNAL_CHK\n    ___internal {CUR_VER}, {MIN_VER},0,0\n    PURGE CUR_VER, MIN_VER, INTERNAL_CHK, ___internal\nENDM\n\n\n;***************************************************************************\n;*\n;* General memory region constants\n;*\n;***************************************************************************\n\nDEF _VRAM        EQU $8000 ; $8000->$9FFF\nDEF _SCRN0       EQU $9800 ; $9800->$9BFF\nDEF _SCRN1       EQU $9C00 ; $9C00->$9FFF\nDEF _SRAM        EQU $A000 ; $A000->$BFFF\nDEF _RAM         EQU $C000 ; $C000->$CFFF / $C000->$DFFF\nDEF _RAMBANK     EQU $D000 ; $D000->$DFFF\nDEF _OAMRAM      EQU $FE00 ; $FE00->$FE9F\nDEF _IO          EQU $FF00 ; $FF00->$FF7F,$FFFF\nDEF _AUD3WAVERAM EQU $FF30 ; $FF30->$FF3F\nDEF _HRAM        EQU $FF80 ; $FF80->$FFFE\n\n\n;***************************************************************************\n;*\n;* MBC registers\n;*\n;***************************************************************************\n\n; *** Common ***\n\n; --\n; -- RAMG ($0000-$1FFF)\n; -- Controls whether access to SRAM (and the MBC3 RTC registers) is allowed (W)\n; --\nDEF rRAMG EQU $0000\n\nDEF CART_SRAM_ENABLE  EQU $0A\nDEF CART_SRAM_DISABLE EQU $00\n\n\n; --\n; -- ROMB0 ($2000-$3FFF)\n; -- Selects which ROM bank is mapped to the ROMX space ($4000-$7FFF) (W)\n; --\n; -- The range of accepted values, as well as the behavior of writing $00,\n; -- varies depending on the MBC.\n; --\nDEF rROMB0 EQU $2000\n\n; --\n; -- RAMB ($4000-$5FFF)\n; -- Selects which SRAM bank is mapped to the SRAM space ($A000-$BFFF) (W)\n; --\n; -- The range of accepted values varies depending on the cartridge configuration.\n; --\nDEF rRAMB EQU $4000\n\n\n; *** MBC3-specific registers ***\n\n; Write one of these to rRAMG to map the corresponding RTC register to all SRAM space\nDEF RTC_S  EQU $08 ; Seconds  (0-59)\nDEF RTC_M  EQU $09 ; Minutes  (0-59)\nDEF RTC_H  EQU $0A ; Hours    (0-23)\nDEF RTC_DL EQU $0B ; Lower 8 bits of Day Counter ($00-$FF)\nDEF RTC_DH EQU $0C ; Bit 7 - Day Counter Carry Bit (1=Counter Overflow)\n                   ; Bit 6 - Halt (0=Active, 1=Stop Timer)\n                   ; Bit 0 - Most significant bit of Day Counter (Bit 8)\n\n\n; --\n; -- RTCLATCH ($6000-$7FFF)\n; -- Write $00 then $01 to latch the current time into the RTC registers (W)\n; --\nDEF rRTCLATCH EQU $6000\n\n\n; *** MBC5-specific register ***\n\n; --\n; -- ROMB1 ($3000-$3FFF)\n; -- A 9th bit that \"extends\" ROMB0 if more than 256 banks are present (W)\n; --\n; -- Also note that rROMB0 thus only spans $2000-$2FFF.\n; --\nDEF rROMB1 EQU $3000\n\n\n; Bit 3 of RAMB enables the rumble motor (if any)\nDEF CART_RUMBLE_ON EQU 1 << 3\n\n\n;***************************************************************************\n;*\n;* Memory-mapped registers\n;*\n;***************************************************************************\n\n; --\n; -- P1 ($FF00)\n; -- Register for reading joy pad info. (R/W)\n; --\nDEF rP1 EQU $FF00\n\nDEF P1F_5 EQU %00100000 ; P15 out port, set to 0 to get buttons\nDEF P1F_4 EQU %00010000 ; P14 out port, set to 0 to get dpad\nDEF P1F_3 EQU %00001000 ; P13 in port\nDEF P1F_2 EQU %00000100 ; P12 in port\nDEF P1F_1 EQU %00000010 ; P11 in port\nDEF P1F_0 EQU %00000001 ; P10 in port\n\nDEF P1F_GET_DPAD EQU P1F_5\nDEF P1F_GET_BTN  EQU P1F_4\nDEF P1F_GET_NONE EQU P1F_4 | P1F_5\n\n\n; --\n; -- SB ($FF01)\n; -- Serial Transfer Data (R/W)\n; --\nDEF rSB EQU $FF01\n\n\n; --\n; -- SC ($FF02)\n; -- Serial I/O Control (R/W)\n; --\nDEF rSC EQU $FF02\n\nDEF SCF_START  EQU %10000000 ; Transfer Start Flag (1=Transfer in progress, or requested)\nDEF SCF_SPEED  EQU %00000010 ; Clock Speed (0=Normal, 1=Fast) ** CGB Mode Only **\nDEF SCF_SOURCE EQU %00000001 ; Shift Clock (0=External Clock, 1=Internal Clock)\n\nDEF SCB_START  EQU 7\nDEF SCB_SPEED  EQU 1\nDEF SCB_SOURCE EQU 0\n\n; --\n; -- DIV ($FF04)\n; -- Divider register (R/W)\n; --\nDEF rDIV EQU $FF04\n\n\n; --\n; -- TIMA ($FF05)\n; -- Timer counter (R/W)\n; --\nDEF rTIMA EQU $FF05\n\n\n; --\n; -- TMA ($FF06)\n; -- Timer modulo (R/W)\n; --\nDEF rTMA EQU $FF06\n\n\n; --\n; -- TAC ($FF07)\n; -- Timer control (R/W)\n; --\nDEF rTAC EQU $FF07\n\nDEF TACF_START  EQU %00000100\nDEF TACF_STOP   EQU %00000000\nDEF TACF_4KHZ   EQU %00000000\nDEF TACF_16KHZ  EQU %00000011\nDEF TACF_65KHZ  EQU %00000010\nDEF TACF_262KHZ EQU %00000001\n\nDEF TACB_START  EQU 2\n\n\n; --\n; -- IF ($FF0F)\n; -- Interrupt Flag (R/W)\n; --\nDEF rIF EQU $FF0F\n\n\n; --\n; -- AUD1SWEEP/NR10 ($FF10)\n; -- Sweep register (R/W)\n; --\n; -- Bit 6-4 - Sweep Time\n; -- Bit 3   - Sweep Increase/Decrease\n; --           0: Addition    (frequency increases???)\n; --           1: Subtraction (frequency increases???)\n; -- Bit 2-0 - Number of sweep shift (# 0-7)\n; -- Sweep Time: (n*7.8ms)\n; --\nDEF rNR10 EQU $FF10\nDEF rAUD1SWEEP EQU rNR10\n\nDEF AUD1SWEEP_UP   EQU %00000000\nDEF AUD1SWEEP_DOWN EQU %00001000\n\n\n; --\n; -- AUD1LEN/NR11 ($FF11)\n; -- Sound length/Wave pattern duty (R/W)\n; --\n; -- Bit 7-6 - Wave Pattern Duty (00:12.5% 01:25% 10:50% 11:75%)\n; -- Bit 5-0 - Sound length data (# 0-63)\n; --\nDEF rNR11 EQU $FF11\nDEF rAUD1LEN EQU rNR11\n\n\n; --\n; -- AUD1ENV/NR12 ($FF12)\n; -- Envelope (R/W)\n; --\n; -- Bit 7-4 - Initial value of envelope\n; -- Bit 3   - Envelope UP/DOWN\n; --           0: Decrease\n; --           1: Range of increase\n; -- Bit 2-0 - Number of envelope sweep (# 0-7)\n; --\nDEF rNR12 EQU $FF12\nDEF rAUD1ENV EQU rNR12\n\n\n; --\n; -- AUD1LOW/NR13 ($FF13)\n; -- Frequency low byte (W)\n; --\nDEF rNR13 EQU $FF13\nDEF rAUD1LOW EQU rNR13\n\n\n; --\n; -- AUD1HIGH/NR14 ($FF14)\n; -- Frequency high byte (W)\n; --\n; -- Bit 7   - Initial (when set, sound restarts)\n; -- Bit 6   - Counter/consecutive selection\n; -- Bit 2-0 - Frequency's higher 3 bits\n; --\nDEF rNR14 EQU $FF14\nDEF rAUD1HIGH EQU rNR14\n\n\n; --\n; -- AUD2LEN/NR21 ($FF16)\n; -- Sound Length; Wave Pattern Duty (R/W)\n; --\n; -- see AUD1LEN for info\n; --\nDEF rNR21 EQU $FF16\nDEF rAUD2LEN EQU rNR21\n\n\n; --\n; -- AUD2ENV/NR22 ($FF17)\n; -- Envelope (R/W)\n; --\n; -- see AUD1ENV for info\n; --\nDEF rNR22 EQU $FF17\nDEF rAUD2ENV EQU rNR22\n\n\n; --\n; -- AUD2LOW/NR23 ($FF18)\n; -- Frequency low byte (W)\n; --\nDEF rNR23 EQU $FF18\nDEF rAUD2LOW EQU rNR23\n\n\n; --\n; -- AUD2HIGH/NR24 ($FF19)\n; -- Frequency high byte (W)\n; --\n; -- see AUD1HIGH for info\n; --\nDEF rNR24 EQU $FF19\nDEF rAUD2HIGH EQU rNR24\n\n\n; --\n; -- AUD3ENA/NR30 ($FF1A)\n; -- Sound on/off (R/W)\n; --\n; -- Bit 7   - Sound ON/OFF (1=ON,0=OFF)\n; --\nDEF rNR30 EQU $FF1A\nDEF rAUD3ENA EQU rNR30\n\nDEF AUD3ENA_OFF EQU %00000000\nDEF AUD3ENA_ON  EQU %10000000\n\n\n; --\n; -- AUD3LEN/NR31 ($FF1B)\n; -- Sound length (R/W)\n; --\n; -- Bit 7-0 - Sound length\n; --\nDEF rNR31 EQU $FF1B\nDEF rAUD3LEN EQU rNR31\n\n\n; --\n; -- AUD3LEVEL/NR32 ($FF1C)\n; -- Select output level\n; --\n; -- Bit 6-5 - Select output level\n; --           00: 0/1 (mute)\n; --           01: 1/1\n; --           10: 1/2\n; --           11: 1/4\n; --\nDEF rNR32 EQU $FF1C\nDEF rAUD3LEVEL EQU rNR32\n\nDEF AUD3LEVEL_MUTE EQU %00000000\nDEF AUD3LEVEL_100  EQU %00100000\nDEF AUD3LEVEL_50   EQU %01000000\nDEF AUD3LEVEL_25   EQU %01100000\n\n\n; --\n; -- AUD3LOW/NR33 ($FF1D)\n; -- Frequency low byte (W)\n; --\n; -- see AUD1LOW for info\n; --\nDEF rNR33 EQU $FF1D\nDEF rAUD3LOW EQU rNR33\n\n\n; --\n; -- AUD3HIGH/NR34 ($FF1E)\n; -- Frequency high byte (W)\n; --\n; -- see AUD1HIGH for info\n; --\nDEF rNR34 EQU $FF1E\nDEF rAUD3HIGH EQU rNR34\n\n\n; --\n; -- AUD4LEN/NR41 ($FF20)\n; -- Sound length (R/W)\n; --\n; -- Bit 5-0 - Sound length data (# 0-63)\n; --\nDEF rNR41 EQU $FF20\nDEF rAUD4LEN EQU rNR41\n\n\n; --\n; -- AUD4ENV/NR42 ($FF21)\n; -- Envelope (R/W)\n; --\n; -- see AUD1ENV for info\n; --\nDEF rNR42 EQU $FF21\nDEF rAUD4ENV EQU rNR42\n\n\n; --\n; -- AUD4POLY/NR43 ($FF22)\n; -- Polynomial counter (R/W)\n; --\n; -- Bit 7-4 - Selection of the shift clock frequency of the (scf)\n; --           polynomial counter (0000-1101)\n; --           freq=drf*1/2^scf (not sure)\n; -- Bit 3 -   Selection of the polynomial counter's step\n; --           0: 15 steps\n; --           1: 7 steps\n; -- Bit 2-0 - Selection of the dividing ratio of frequencies (drf)\n; --           000: f/4   001: f/8   010: f/16  011: f/24\n; --           100: f/32  101: f/40  110: f/48  111: f/56  (f=4.194304 Mhz)\n; --\nDEF rNR43 EQU $FF22\nDEF rAUD4POLY EQU rNR43\n\nDEF AUD4POLY_15STEP EQU %00000000\nDEF AUD4POLY_7STEP  EQU %00001000\n\n\n; --\n; -- AUD4GO/NR44 ($FF23)\n; --\n; -- Bit 7 -   Initial (when set, sound restarts)\n; -- Bit 6 -   Counter/consecutive selection\n; --\nDEF rNR44 EQU $FF23\nDEF rAUD4GO EQU rNR44\n\n\n; --\n; -- AUDVOL/NR50 ($FF24)\n; -- Channel control / ON-OFF / Volume (R/W)\n; --\n; -- Bit 7   - Vin->SO2 ON/OFF (left)\n; -- Bit 6-4 - SO2 output level (left speaker) (# 0-7)\n; -- Bit 3   - Vin->SO1 ON/OFF (right)\n; -- Bit 2-0 - SO1 output level (right speaker) (# 0-7)\n; --\nDEF rNR50 EQU $FF24\nDEF rAUDVOL EQU rNR50\n\nDEF AUDVOL_VIN_LEFT  EQU %10000000 ; SO2\nDEF AUDVOL_VIN_RIGHT EQU %00001000 ; SO1\n\n\n; --\n; -- AUDTERM/NR51 ($FF25)\n; -- Selection of Sound output terminal (R/W)\n; --\n; -- Bit 7   - Output channel 4 to SO2 terminal (left)\n; -- Bit 6   - Output channel 3 to SO2 terminal (left)\n; -- Bit 5   - Output channel 2 to SO2 terminal (left)\n; -- Bit 4   - Output channel 1 to SO2 terminal (left)\n; -- Bit 3   - Output channel 4 to SO1 terminal (right)\n; -- Bit 2   - Output channel 3 to SO1 terminal (right)\n; -- Bit 1   - Output channel 2 to SO1 terminal (right)\n; -- Bit 0   - Output channel 1 to SO1 terminal (right)\n; --\nDEF rNR51 EQU $FF25\nDEF rAUDTERM EQU rNR51\n\n; SO2\nDEF AUDTERM_4_LEFT  EQU %10000000\nDEF AUDTERM_3_LEFT  EQU %01000000\nDEF AUDTERM_2_LEFT  EQU %00100000\nDEF AUDTERM_1_LEFT  EQU %00010000\n; SO1\nDEF AUDTERM_4_RIGHT EQU %00001000\nDEF AUDTERM_3_RIGHT EQU %00000100\nDEF AUDTERM_2_RIGHT EQU %00000010\nDEF AUDTERM_1_RIGHT EQU %00000001\n\n\n; --\n; -- AUDENA/NR52 ($FF26)\n; -- Sound on/off (R/W)\n; --\n; -- Bit 7   - All sound on/off (sets all audio regs to 0!)\n; -- Bit 3   - Sound 4 ON flag (read only)\n; -- Bit 2   - Sound 3 ON flag (read only)\n; -- Bit 1   - Sound 2 ON flag (read only)\n; -- Bit 0   - Sound 1 ON flag (read only)\n; --\nDEF rNR52 EQU $FF26\nDEF rAUDENA EQU rNR52\n\nDEF AUDENA_ON    EQU %10000000\nDEF AUDENA_OFF   EQU %00000000  ; sets all audio regs to 0!\n\n\n; --\n; -- LCDC ($FF40)\n; -- LCD Control (R/W)\n; --\nDEF rLCDC EQU $FF40\n\nDEF LCDCF_OFF     EQU %00000000 ; LCD Control Operation\nDEF LCDCF_ON      EQU %10000000 ; LCD Control Operation\nDEF LCDCF_WIN9800 EQU %00000000 ; Window Tile Map Display Select\nDEF LCDCF_WIN9C00 EQU %01000000 ; Window Tile Map Display Select\nDEF LCDCF_WINOFF  EQU %00000000 ; Window Display\nDEF LCDCF_WINON   EQU %00100000 ; Window Display\nDEF LCDCF_BG8800  EQU %00000000 ; BG & Window Tile Data Select\nDEF LCDCF_BG8000  EQU %00010000 ; BG & Window Tile Data Select\nDEF LCDCF_BG9800  EQU %00000000 ; BG Tile Map Display Select\nDEF LCDCF_BG9C00  EQU %00001000 ; BG Tile Map Display Select\nDEF LCDCF_OBJ8    EQU %00000000 ; OBJ Construction\nDEF LCDCF_OBJ16   EQU %00000100 ; OBJ Construction\nDEF LCDCF_OBJOFF  EQU %00000000 ; OBJ Display\nDEF LCDCF_OBJON   EQU %00000010 ; OBJ Display\nDEF LCDCF_BGOFF   EQU %00000000 ; BG Display\nDEF LCDCF_BGON    EQU %00000001 ; BG Display\n\nDEF LCDCB_ON      EQU 7 ; LCD Control Operation\nDEF LCDCB_WIN9C00 EQU 6 ; Window Tile Map Display Select\nDEF LCDCB_WINON   EQU 5 ; Window Display\nDEF LCDCB_BG8000  EQU 4 ; BG & Window Tile Data Select\nDEF LCDCB_BG9C00  EQU 3 ; BG Tile Map Display Select\nDEF LCDCB_OBJ16   EQU 2 ; OBJ Construction\nDEF LCDCB_OBJON   EQU 1 ; OBJ Display\nDEF LCDCB_BGON    EQU 0 ; BG Display\n; \"Window Character Data Select\" follows BG\n\n\n; --\n; -- STAT ($FF41)\n; -- LCDC Status   (R/W)\n; --\nDEF rSTAT EQU $FF41\n\nDEF STATF_LYC     EQU  %01000000 ; LYC=LY Coincidence (Selectable)\nDEF STATF_MODE10  EQU  %00100000 ; Mode 10\nDEF STATF_MODE01  EQU  %00010000 ; Mode 01 (V-Blank)\nDEF STATF_MODE00  EQU  %00001000 ; Mode 00 (H-Blank)\nDEF STATF_LYCF    EQU  %00000100 ; Coincidence Flag\nDEF STATF_HBL     EQU  %00000000 ; H-Blank\nDEF STATF_VBL     EQU  %00000001 ; V-Blank\nDEF STATF_OAM     EQU  %00000010 ; OAM-RAM is used by system\nDEF STATF_LCD     EQU  %00000011 ; Both OAM and VRAM used by system\nDEF STATF_BUSY    EQU  %00000010 ; When set, VRAM access is unsafe\n\nDEF STATB_LYC     EQU  6\nDEF STATB_MODE10  EQU  5\nDEF STATB_MODE01  EQU  4\nDEF STATB_MODE00  EQU  3\nDEF STATB_LYCF    EQU  2\nDEF STATB_BUSY    EQU  1\n\n; --\n; -- SCY ($FF42)\n; -- Scroll Y (R/W)\n; --\nDEF rSCY EQU $FF42\n\n\n; --\n; -- SCX ($FF43)\n; -- Scroll X (R/W)\n; --\nDEF rSCX EQU $FF43\n\n\n; --\n; -- LY ($FF44)\n; -- LCDC Y-Coordinate (R)\n; --\n; -- Values range from 0->153. 144->153 is the VBlank period.\n; --\nDEF rLY EQU $FF44\n\n\n; --\n; -- LYC ($FF45)\n; -- LY Compare (R/W)\n; --\n; -- When LY==LYC, STATF_LYCF will be set in STAT\n; --\nDEF rLYC EQU $FF45\n\n\n; --\n; -- DMA ($FF46)\n; -- DMA Transfer and Start Address (W)\n; --\nDEF rDMA EQU $FF46\n\n\n; --\n; -- BGP ($FF47)\n; -- BG Palette Data (W)\n; --\n; -- Bit 7-6 - Intensity for %11\n; -- Bit 5-4 - Intensity for %10\n; -- Bit 3-2 - Intensity for %01\n; -- Bit 1-0 - Intensity for %00\n; --\nDEF rBGP EQU $FF47\n\n\n; --\n; -- OBP0 ($FF48)\n; -- Object Palette 0 Data (W)\n; --\n; -- See BGP for info\n; --\nDEF rOBP0 EQU $FF48\n\n\n; --\n; -- OBP1 ($FF49)\n; -- Object Palette 1 Data (W)\n; --\n; -- See BGP for info\n; --\nDEF rOBP1 EQU $FF49\n\n\n; --\n; -- WY ($FF4A)\n; -- Window Y Position (R/W)\n; --\n; -- 0 <= WY <= 143\n; -- When WY = 0, the window is displayed from the top edge of the LCD screen.\n; --\nDEF rWY EQU $FF4A\n\n\n; --\n; -- WX ($FF4B)\n; -- Window X Position (R/W)\n; --\n; -- 7 <= WX <= 166\n; -- When WX = 7, the window is displayed from the left edge of the LCD screen.\n; -- Values of 0-6 and 166 are unreliable due to hardware bugs.\n; --\nDEF rWX EQU $FF4B\n\nDEF WX_OFS EQU 7 ; add this to a screen position to get a WX position\n\n\n; --\n; -- SPEED ($FF4D)\n; -- Select CPU Speed (R/W)\n; --\nDEF rKEY1 EQU $FF4D\nDEF rSPD  EQU rKEY1\n\nDEF KEY1F_DBLSPEED EQU %10000000 ; 0=Normal Speed, 1=Double Speed (R)\nDEF KEY1F_PREPARE  EQU %00000001 ; 0=No, 1=Prepare (R/W)\n\n\n; --\n; -- VBK ($FF4F)\n; -- Select Video RAM Bank (R/W)\n; --\n; -- Bit 0 - Bank Specification (0: Specify Bank 0; 1: Specify Bank 1)\n; --\nDEF rVBK EQU $FF4F\n\n\n; --\n; -- HDMA1 ($FF51)\n; -- High byte for Horizontal Blanking/General Purpose DMA source address (W)\n; -- CGB Mode Only\n; --\nDEF rHDMA1 EQU $FF51\n\n\n; --\n; -- HDMA2 ($FF52)\n; -- Low byte for Horizontal Blanking/General Purpose DMA source address (W)\n; -- CGB Mode Only\n; --\nDEF rHDMA2 EQU $FF52\n\n\n; --\n; -- HDMA3 ($FF53)\n; -- High byte for Horizontal Blanking/General Purpose DMA destination address (W)\n; -- CGB Mode Only\n; --\nDEF rHDMA3 EQU $FF53\n\n\n; --\n; -- HDMA4 ($FF54)\n; -- Low byte for Horizontal Blanking/General Purpose DMA destination address (W)\n; -- CGB Mode Only\n; --\nDEF rHDMA4 EQU $FF54\n\n\n; --\n; -- HDMA5 ($FF55)\n; -- Transfer length (in tiles minus 1)/mode/start for Horizontal Blanking, General Purpose DMA (R/W)\n; -- CGB Mode Only\n; --\nDEF rHDMA5 EQU $FF55\n\nDEF HDMA5F_MODE_GP  EQU %00000000 ; General Purpose DMA (W)\nDEF HDMA5F_MODE_HBL EQU %10000000 ; HBlank DMA (W)\nDEF HDMA5B_MODE EQU 7 ; DMA mode select (W)\n\n; -- Once DMA has started, use HDMA5F_BUSY to check when the transfer is complete\nDEF HDMA5F_BUSY EQU %10000000 ; 0=Busy (DMA still in progress), 1=Transfer complete (R)\n\n\n; --\n; -- RP ($FF56)\n; -- Infrared Communications Port (R/W)\n; -- CGB Mode Only\n; --\nDEF rRP EQU $FF56\n\nDEF RPF_ENREAD   EQU %11000000\nDEF RPF_DATAIN   EQU %00000010 ; 0=Receiving IR Signal, 1=Normal\nDEF RPF_WRITE_HI EQU %00000001\nDEF RPF_WRITE_LO EQU %00000000\n\nDEF RPB_LED_ON   EQU 0\nDEF RPB_DATAIN   EQU 1\n\n\n; --\n; -- BCPS/BGPI ($FF68)\n; -- Background Color Palette Specification (aka Background Palette Index) (R/W)\n; --\nDEF rBCPS EQU $FF68\nDEF rBGPI EQU rBCPS\n\nDEF BCPSF_AUTOINC EQU %10000000 ; Auto Increment (0=Disabled, 1=Increment after Writing)\nDEF BCPSB_AUTOINC EQU 7\nDEF BGPIF_AUTOINC EQU BCPSF_AUTOINC\nDEF BGPIB_AUTOINC EQU BCPSB_AUTOINC\n\n\n; --\n; -- BCPD/BGPD ($FF69)\n; -- Background Color Palette Data (aka Background Palette Data) (R/W)\n; --\nDEF rBCPD EQU $FF69\nDEF rBGPD EQU rBCPD\n\n\n; --\n; -- OCPS/OBPI ($FF6A)\n; -- Object Color Palette Specification (aka Object Background Palette Index) (R/W)\n; --\nDEF rOCPS EQU $FF6A\nDEF rOBPI EQU rOCPS\n\nDEF OCPSF_AUTOINC EQU %10000000 ; Auto Increment (0=Disabled, 1=Increment after Writing)\nDEF OCPSB_AUTOINC EQU 7\nDEF OBPIF_AUTOINC EQU OCPSF_AUTOINC\nDEF OBPIB_AUTOINC EQU OCPSB_AUTOINC\n\n\n; --\n; -- OCPD/OBPD ($FF6B)\n; -- Object Color Palette Data (aka Object Background Palette Data) (R/W)\n; --\nDEF rOCPD EQU $FF6B\nDEF rOBPD EQU rOCPD\n\n\n; --\n; -- SMBK/SVBK ($FF70)\n; -- Select Main RAM Bank (R/W)\n; --\n; -- Bit 2-0 - Bank Specification (0,1: Specify Bank 1; 2-7: Specify Banks 2-7)\n; --\nDEF rSVBK EQU $FF70\nDEF rSMBK EQU rSVBK\n\n\n; --\n; -- PCM12 ($FF76)\n; -- Sound channel 1&2 PCM amplitude (R)\n; --\n; -- Bit 7-4 - Copy of sound channel 2's PCM amplitude\n; -- Bit 3-0 - Copy of sound channel 1's PCM amplitude\n; --\nDEF rPCM12 EQU $FF76\n\n\n; --\n; -- PCM34 ($FF77)\n; -- Sound channel 3&4 PCM amplitude (R)\n; --\n; -- Bit 7-4 - Copy of sound channel 4's PCM amplitude\n; -- Bit 3-0 - Copy of sound channel 3's PCM amplitude\n; --\nDEF rPCM34 EQU $FF77\n\n\n; --\n; -- IE ($FFFF)\n; -- Interrupt Enable (R/W)\n; --\nDEF rIE EQU $FFFF\n\nDEF IEF_HILO   EQU %00010000 ; Transition from High to Low of Pin number P10-P13\nDEF IEF_SERIAL EQU %00001000 ; Serial I/O transfer end\nDEF IEF_TIMER  EQU %00000100 ; Timer Overflow\nDEF IEF_STAT   EQU %00000010 ; STAT\nDEF IEF_VBLANK EQU %00000001 ; V-Blank\n\nDEF IEB_HILO   EQU 4\nDEF IEB_SERIAL EQU 3\nDEF IEB_TIMER  EQU 2\nDEF IEB_STAT   EQU 1\nDEF IEB_VBLANK EQU 0\n\n\n;***************************************************************************\n;*\n;* Flags common to multiple sound channels\n;*\n;***************************************************************************\n\n; --\n; -- Square wave duty cycle\n; --\n; -- Can be used with AUD1LEN and AUD2LEN\n; -- See AUD1LEN for more info\n; --\nDEF AUDLEN_DUTY_12_5    EQU %00000000 ; 12.5%\nDEF AUDLEN_DUTY_25      EQU %01000000 ; 25%\nDEF AUDLEN_DUTY_50      EQU %10000000 ; 50%\nDEF AUDLEN_DUTY_75      EQU %11000000 ; 75%\n\n\n; --\n; -- Audio envelope flags\n; --\n; -- Can be used with AUD1ENV, AUD2ENV, AUD4ENV\n; -- See AUD1ENV for more info\n; --\nDEF AUDENV_UP           EQU %00001000\nDEF AUDENV_DOWN         EQU %00000000\n\n\n; --\n; -- Audio trigger flags\n; --\n; -- Can be used with AUD1HIGH, AUD2HIGH, AUD3HIGH\n; -- See AUD1HIGH for more info\n; --\nDEF AUDHIGH_RESTART     EQU %10000000\nDEF AUDHIGH_LENGTH_ON   EQU %01000000\nDEF AUDHIGH_LENGTH_OFF  EQU %00000000\n\n\n;***************************************************************************\n;*\n;* CPU values on bootup (a=type, b=qualifier)\n;*\n;***************************************************************************\n\nDEF BOOTUP_A_DMG    EQU $01 ; Dot Matrix Game\nDEF BOOTUP_A_CGB    EQU $11 ; Color GameBoy\nDEF BOOTUP_A_MGB    EQU $FF ; Mini GameBoy (Pocket GameBoy)\n\n; if a=BOOTUP_A_CGB, bit 0 in b can be checked to determine if real CGB or\n; other system running in GBC mode\nDEF BOOTUP_B_CGB    EQU %00000000\nDEF BOOTUP_B_AGB    EQU %00000001   ; GBA, GBA SP, Game Boy Player, or New GBA SP\n\n\n;***************************************************************************\n;*\n;* Header\n;*\n;***************************************************************************\n\n;*\n;* Nintendo scrolling logo\n;* (Code won't work on a real GameBoy)\n;* (if next lines are altered.)\nMACRO NINTENDO_LOGO\n    DB  $CE,$ED,$66,$66,$CC,$0D,$00,$0B,$03,$73,$00,$83,$00,$0C,$00,$0D\n    DB  $00,$08,$11,$1F,$88,$89,$00,$0E,$DC,$CC,$6E,$E6,$DD,$DD,$D9,$99\n    DB  $BB,$BB,$67,$63,$6E,$0E,$EC,$CC,$DD,$DC,$99,$9F,$BB,$B9,$33,$3E\nENDM\n\n; $0143 Color GameBoy compatibility code\nDEF CART_COMPATIBLE_DMG     EQU $00\nDEF CART_COMPATIBLE_DMG_GBC EQU $80\nDEF CART_COMPATIBLE_GBC     EQU $C0\n\n; $0146 GameBoy/Super GameBoy indicator\nDEF CART_INDICATOR_GB       EQU $00\nDEF CART_INDICATOR_SGB      EQU $03\n\n; $0147 Cartridge type\nDEF CART_ROM                     EQU $00\nDEF CART_ROM_MBC1                EQU $01\nDEF CART_ROM_MBC1_RAM            EQU $02\nDEF CART_ROM_MBC1_RAM_BAT        EQU $03\nDEF CART_ROM_MBC2                EQU $05\nDEF CART_ROM_MBC2_BAT            EQU $06\nDEF CART_ROM_RAM                 EQU $08\nDEF CART_ROM_RAM_BAT             EQU $09\nDEF CART_ROM_MMM01               EQU $0B\nDEF CART_ROM_MMM01_RAM           EQU $0C\nDEF CART_ROM_MMM01_RAM_BAT       EQU $0D\nDEF CART_ROM_MBC3_BAT_RTC        EQU $0F\nDEF CART_ROM_MBC3_RAM_BAT_RTC    EQU $10\nDEF CART_ROM_MBC3                EQU $11\nDEF CART_ROM_MBC3_RAM            EQU $12\nDEF CART_ROM_MBC3_RAM_BAT        EQU $13\nDEF CART_ROM_MBC5                EQU $19\nDEF CART_ROM_MBC5_BAT            EQU $1A\nDEF CART_ROM_MBC5_RAM_BAT        EQU $1B\nDEF CART_ROM_MBC5_RUMBLE         EQU $1C\nDEF CART_ROM_MBC5_RAM_RUMBLE     EQU $1D\nDEF CART_ROM_MBC5_RAM_BAT_RUMBLE EQU $1E\nDEF CART_ROM_MBC7_RAM_BAT_GYRO   EQU $22\nDEF CART_ROM_POCKET_CAMERA       EQU $FC\nDEF CART_ROM_BANDAI_TAMA5        EQU $FD\nDEF CART_ROM_HUDSON_HUC3         EQU $FE\nDEF CART_ROM_HUDSON_HUC1         EQU $FF\n\n; $0148 ROM size\n; these are kilobytes\nDEF CART_ROM_32KB   EQU $00 ; 2 banks\nDEF CART_ROM_64KB   EQU $01 ; 4 banks\nDEF CART_ROM_128KB  EQU $02 ; 8 banks\nDEF CART_ROM_256KB  EQU $03 ; 16 banks\nDEF CART_ROM_512KB  EQU $04 ; 32 banks\nDEF CART_ROM_1024KB EQU $05 ; 64 banks\nDEF CART_ROM_2048KB EQU $06 ; 128 banks\nDEF CART_ROM_4096KB EQU $07 ; 256 banks\nDEF CART_ROM_8192KB EQU $08 ; 512 banks\nDEF CART_ROM_1152KB EQU $52 ; 72 banks\nDEF CART_ROM_1280KB EQU $53 ; 80 banks\nDEF CART_ROM_1536KB EQU $54 ; 96 banks\n\n; $0149 SRAM size\n; these are kilobytes\nDEF CART_SRAM_NONE  EQU 0\nDEF CART_SRAM_8KB   EQU 2 ; 1 bank\nDEF CART_SRAM_32KB  EQU 3 ; 4 banks\nDEF CART_SRAM_128KB EQU 4 ; 16 banks\n\n; $014A Destination code\nDEF CART_DEST_JAPANESE     EQU $00\nDEF CART_DEST_NON_JAPANESE EQU $01\n\n\n;***************************************************************************\n;*\n;* Keypad related\n;*\n;***************************************************************************\n\nDEF PADF_DOWN   EQU $80\nDEF PADF_UP     EQU $40\nDEF PADF_LEFT   EQU $20\nDEF PADF_RIGHT  EQU $10\nDEF PADF_START  EQU $08\nDEF PADF_SELECT EQU $04\nDEF PADF_B      EQU $02\nDEF PADF_A      EQU $01\n\nDEF PADB_DOWN   EQU $7\nDEF PADB_UP     EQU $6\nDEF PADB_LEFT   EQU $5\nDEF PADB_RIGHT  EQU $4\nDEF PADB_START  EQU $3\nDEF PADB_SELECT EQU $2\nDEF PADB_B      EQU $1\nDEF PADB_A      EQU $0\n\n\n;***************************************************************************\n;*\n;* Screen related\n;*\n;***************************************************************************\n\nDEF SCRN_X    EQU 160 ; Width of screen in pixels\nDEF SCRN_Y    EQU 144 ; Height of screen in pixels. Also corresponds to the value in LY at the beginning of VBlank.\nDEF SCRN_X_B  EQU 20  ; Width of screen in bytes\nDEF SCRN_Y_B  EQU 18  ; Height of screen in bytes\n\nDEF SCRN_VX   EQU 256 ; Virtual width of screen in pixels\nDEF SCRN_VY   EQU 256 ; Virtual height of screen in pixels\nDEF SCRN_VX_B EQU 32  ; Virtual width of screen in bytes\nDEF SCRN_VY_B EQU 32  ; Virtual height of screen in bytes\n\n\n;***************************************************************************\n;*\n;* OAM related\n;*\n;***************************************************************************\n\n; OAM attributes\n; each entry in OAM RAM is 4 bytes (sizeof_OAM_ATTRS)\nRSRESET\nDEF OAMA_Y              RB  1   ; y pos plus 16\nDEF OAMA_X              RB  1   ; x pos plus 8\nDEF OAMA_TILEID         RB  1   ; tile id\nDEF OAMA_FLAGS          RB  1   ; flags (see below)\nDEF sizeof_OAM_ATTRS    RB  0\n\nDEF OAM_Y_OFS EQU 16 ; add this to a screen-relative Y position to get an OAM Y position\nDEF OAM_X_OFS EQU 8  ; add this to a screen-relative X position to get an OAM X position\n\nDEF OAM_COUNT           EQU 40  ; number of OAM entries in OAM RAM\n\n; flags\nDEF OAMF_PRI        EQU %10000000 ; Priority\nDEF OAMF_YFLIP      EQU %01000000 ; Y flip\nDEF OAMF_XFLIP      EQU %00100000 ; X flip\nDEF OAMF_PAL0       EQU %00000000 ; Palette number; 0,1 (DMG)\nDEF OAMF_PAL1       EQU %00010000 ; Palette number; 0,1 (DMG)\nDEF OAMF_BANK0      EQU %00000000 ; Bank number; 0,1 (GBC)\nDEF OAMF_BANK1      EQU %00001000 ; Bank number; 0,1 (GBC)\n\nDEF OAMF_PALMASK    EQU %00000111 ; Palette (GBC)\n\nDEF OAMB_PRI        EQU 7 ; Priority\nDEF OAMB_YFLIP      EQU 6 ; Y flip\nDEF OAMB_XFLIP      EQU 5 ; X flip\nDEF OAMB_PAL1       EQU 4 ; Palette number; 0,1 (DMG)\nDEF OAMB_BANK1      EQU 3 ; Bank number; 0,1 (GBC)\n\n\n; Deprecated constants. Please avoid using.\n\nDEF IEF_LCDC   EQU %00000010 ; LCDC (see STAT)\nDEF _VRAM8000  EQU _VRAM\nDEF _VRAM8800  EQU _VRAM+$800\nDEF _VRAM9000  EQU _VRAM+$1000\nDEF CART_SRAM_2KB   EQU 1 ; 1 incomplete bank\n\n\n    ENDC ;HARDWARE_INC\n");

/***/ }),

/***/ 42242:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("include \"include/hardware.inc\"\n\nSINGLE_INTERRUPT EQU 1\nSTACK_SIZE EQU $7A\nSFX_STOP_BANK EQU $FF\n\nSECTION \"Vblank interrupt\", ROM0[$0040]\n        reti\n\nSECTION \"LCD controller status interrupt\", ROM0[$0048]\n        jp isr_lcd\n\nSECTION \"Timer overflow interrupt\", ROM0[$0050]\n        jp isr_timer\n\nSECTION \"Serial transfer completion interrupt\", ROM0[$0058]\n        jp isr_serial\n\nSECTION \"P10-P13 signal low edge interrupt\", ROM0[$0060]\n        reti\n\nSECTION \"Stack\", HRAM[$FFFE - STACK_SIZE]\n        ds STACK_SIZE\n\nSECTION \"init\", ROM0[$0100]\n        nop\n        jp $0150\n\nSECTION \"Nintendo logo\", ROM0[$0104]\n        NINTENDO_LOGO\n\nSECTION \"ROM name\", ROM0[$0134]\n; $0134 - $013E: The title, in upper-case letters, followed by zeroes.\n        DB \"HUGE\"\n        DS 7 ; padding\n; $013F - $0142: The manufacturer code. Empty for now\n        DS 4\n        DS 1\n; $0144 - $0145: \"New\" Licensee Code, a two character name.\n        DB \"NF\"\n\nSECTION \"pause control\", WRAM0\nis_player_paused:: db   ; paused flag\ndo_resume_player:: db   ; exit from paused state flag\n\nnew_order::        db   ; new pattern (can be changed while paused)\nnew_row::          db   ; new position within the pattern (can be changed while paused)\n\nSECTION \"sample playback\", WRAM0\n_sfx_play_bank::   db   ; bank of the SFX\n_sfx_play_sample:: dw   ; pointer to SFX\n_sfx_frame_skip:   db\n\ncall_counter:      db\n\nSECTION \"bank tracking\", HRAM\n__current_bank::   db\n\n; Initialization\nSECTION \"main\", ROM0[$0150]\n        jp _main\n\n; LCD ISR\nisr_lcd:\n        push af\n        push hl\n        push bc\n        push de\n        \n        call _hUGE_dosound\n        \n        pop de\n        pop bc\n        pop hl\n        pop af\n        reti\n\n; Timer ISR\nisr_timer:\n        push af\n        push hl\n        push bc\n        push de\n        \n        call _sfx_play\n        \n        if DEF(SINGLE_INTERRUPT)\n            ld hl, call_counter\n            inc [hl]\n            ld a, 3\n            and [hl]\n            call z, _hUGE_dosound \n        ENDC\n        \n        pop de\n        pop bc\n        pop hl\n        pop af\n        reti\n\n; Serial ISR (for pause/resume)\nisr_serial:\n        push af\n        push hl\n        push bc\n        push de\n        \n        ld b, 0\n        call sound_cut\n        ld b, 1\n        call sound_cut\n        ld b, 2\n        call sound_cut\n        ld b, 3\n        call sound_cut\n        \n        ; save current row and order\n        ld a, [row]\n        ld [new_row], a\n        ld a, [current_order]\n        ld [new_order], a\n        \n        xor a\n        ld [do_resume_player], a\n        inc a\n        ld [is_player_paused], a\n\n        ; busyloop until resume\n.loop:\n        ld a, [do_resume_player]\n        or a\n        jr z, .loop\n        \n        ; set new position\n        ld a, [new_row]\n        ld [row], a\n        \n        ld hl, current_order\n        ld a, [new_order]\n        cp [hl]\n        ld [hl], a\n        ld c, a\n        call nz, load_patterns\n\n        xor a\n        ld [is_player_paused], a\n        \n        dec a\n        ld [_hUGE_current_wave], a\n        \n        pop de\n        pop bc\n        pop hl\n        pop af\n        reti\n        \n\n; main() function\n_main::\n        ld a, 0\n        ld [rIF], a\n        ld a, IEF_VBLANK\n        ld [rIE], a\n        halt\n        nop\n        \n        ; Enable sound globally\n        ld a, $80\n        ld [rAUDENA], a\n        ; Enable all channels in stereo\n        ld a, $FF\n        ld [rAUDTERM], a\n        ; Set volume\n        ld a, $77\n        ld [rAUDVOL], a\n        \n        ; cleanup sample player\n        ld hl, _sfx_play_bank\n        ld [hl], SFX_STOP_BANK\n        inc hl\n        xor a\n        ; _sfx_play_sample\n        ld [hl+], a\n        ld [hl+], a\n        ; _sfx_frame_skip\n        ld [hl+], a\n        ;  call_counter\n        ld [hl], a\n        \n        ld [is_player_paused], a\n        ld [do_resume_player], a\n        \n        inc a\n        ldh [__current_bank], a\n        \n        ; setup timer\n        ld a, $c0\n        ldh [rTMA], a\n        ld a, 7\n        ldh [rTAC], a\n        \n        ld hl, SONG_DESCRIPTOR\n        call hUGE_init\n        \n        if !DEF(SINGLE_INTERRUPT)\n            ;; Enable the HBlank interrupt on scanline 0\n            ld a, [rSTAT]\n            or a, STATF_LYC    \n            ld [rSTAT], a\n            xor a ; ld a, 0\n            ld [rLYC], a\n            ; LCD for music, TIMER for SFX, SERIAL for pausing\n            ld a, IEF_LCDC | IEF_TIMER | IEF_SERIAL\n        else\n            ; TIMER for music and SFX, SERIAL for pausing\n            ld a, IEF_TIMER | IEF_SERIAL\n        ENDC\n        \n        ld [rIE], a\n        ; enter paused state immediately\n        and IEF_SERIAL\n        ld [rIF], a\n        ; enable interrupts\n        ei\n        ; loop forever, do nothing\n.init01:\n        halt\n        nop\n        jr .init01\n\n; play SFX effect, return zero in E when done\ncopy_reg: MACRO\n        sla b\n        jr nc, .copyreg\\@\n        ld a, [hl+]\n        ldh [c], a\n.copyreg\\@:\n        inc c\nENDM\n\n_sfx_play:\n        ld hl, _sfx_play_sample\n        ld a, [hl+]\n        ld e, a\n        or [hl]\n        ret z\n        ld d, [hl]\n\n        ld hl, _sfx_frame_skip\n        xor a\n        or [hl]\n        jr z, .sfx07\n        dec [hl]\n.sfx08:\n        ld e, a\n        ret\n.sfx07:\n        ld h, d\n        ld l, e                     ; HL = current position inside the sample\n\n        ld a, [__current_bank]      ; save bank and switch\n        ld e, a\n        ld a, [_sfx_play_bank]\n        inc a                       ; SFX_STOP_BANK ?\n        jr z, .sfx08\n        dec a\n        ld [rROMB0], a\n\n        ld d, $0f\n        ld a, [hl]\n        swap a\n        and d\n        ld [_sfx_frame_skip], a\n\n        ld a, [hl+]\n        and d\n        ld d, a                     ; d = frame channel count\n        jp z, .sfx06\n.sfx02:\n        ld a, [hl+]\n        ld b, a                     ; a = b = channel no + register mask\n\n        and %00000111\n        cp 5\n        jr c, .sfx03\n        cp 7\n        jr z, .sfx05                ; terminator\n\n        xor a\n        ld [rNR30], a\n\n        ld c, LOW(_AUD3WAVERAM)\n        REPT 16\n            ld a, [hl+]\n            ldh [c], a\n            inc c\n        ENDR\n\n        ld a, b\n        cp 6\n        jr nz, .sfx04               ; just load waveform, not play\n\n        ld c, LOW(rNR30)\n        ld a, $80                   ; retrigger wave channel\n        ldh [c],a\n        xor a\n        ldh [c], a\n\n        ld a, $80             \n        ldh [c],a\n        ld a, $FE                   ; length of wave\n        ldh [rNR31],a\n        ld a, $20                   ; volume\n        ldh [rNR32],a\n        xor a                       ; low freq bits are zero\n        ldh [rNR33],a\n        ld a, $C7                   ; start; no loop; high freq bits are 111\n        ldh [rNR34],a       \n\n        jr .sfx04\n.sfx05:                             ; terminator\n        ld hl, 0\n        ld d, l\n        jr .sfx00\n.sfx03:\n        ld  c, a\n        add a\n        add a\n        add c\n        add LOW(rNR10)\n        ld c, a                     ; c = NR10_REG + [a & 7] * 5\n        \n        REPT 5\n            copy_reg\n        ENDR\n\n.sfx04:\n        dec d\n        jp nz, .sfx02\n.sfx06:\n        inc d                       ; return 1 if still playing\n.sfx00:\n        ld a, l                     ; save current position\n        ld [_sfx_play_sample], a\n        ld a, h\n        ld [_sfx_play_sample + 1], a\n\n        ld a, e                     ; restore bank\n        ld [rROMB0], a\n\n        ld e, d                     ; result in e\n\n        ret\n\n; CUT sound on channel B\nsound_cut:\n        ld hl, rAUD1ENV\n        ld a, b\n        add a\n        add a\n        add b\n        \n        add l\n        ld l, a\n        adc h\n        sub l\n        ld h, a\n\n        ld [hl], 0\n        ld a, b\n        cp 2\n        ret z\n\n        inc hl\n        inc hl\n        ld [hl], %11000000\n        ret\n");

/***/ }),

/***/ 32055:
/***/ ((module) => {


var Binjgb = (function () {
    var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
    return (function (Binjgb) {
        Binjgb = Binjgb || {};
        var Module = typeof Binjgb !== "undefined" ? Binjgb : {};
        var readyPromiseResolve, readyPromiseReject;
        Module["ready"] = new Promise(function (resolve, reject) { readyPromiseResolve = resolve; readyPromiseReject = reject; });
        var moduleOverrides = {};
        var key;
        for (key in Module) {
            if (Module.hasOwnProperty(key)) {
                moduleOverrides[key] = Module[key];
            }
        }
        var arguments_ = [];
        var thisProgram = "./this.program";
        var quit_ = function (status, toThrow) { throw toThrow; };
        var ENVIRONMENT_IS_WEB = true;
        var ENVIRONMENT_IS_WORKER = false;
        var scriptDirectory = "";
        function locateFile(path) { if (Module["locateFile"]) {
            return Module["locateFile"](path, scriptDirectory);
        } return scriptDirectory + path; }
        var read_, readAsync, readBinary, setWindowTitle;
        if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
            if (ENVIRONMENT_IS_WORKER) {
                scriptDirectory = self.location.href;
            }
            else if (typeof document !== "undefined" && document.currentScript) {
                scriptDirectory = document.currentScript.src;
            }
            if (_scriptDir) {
                scriptDirectory = _scriptDir;
            }
            if (scriptDirectory.indexOf("blob:") !== 0) {
                scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf("/") + 1);
            }
            else {
                scriptDirectory = "";
            }
            {
                read_ = function (url) { var xhr = new XMLHttpRequest; xhr.open("GET", url, false); xhr.send(null); return xhr.responseText; };
                if (ENVIRONMENT_IS_WORKER) {
                    readBinary = function (url) { var xhr = new XMLHttpRequest; xhr.open("GET", url, false); xhr.responseType = "arraybuffer"; xhr.send(null); return new Uint8Array(xhr.response); };
                }
                readAsync = function (url, onload, onerror) { var xhr = new XMLHttpRequest; xhr.open("GET", url, true); xhr.responseType = "arraybuffer"; xhr.onload = function () { if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                    onload(xhr.response);
                    return;
                } onerror(); }; xhr.onerror = onerror; xhr.send(null); };
            }
            setWindowTitle = function (title) { document.title = title; };
        }
        else { }
        var out = Module["print"] || console.log.bind(console);
        var err = Module["printErr"] || console.warn.bind(console);
        for (key in moduleOverrides) {
            if (moduleOverrides.hasOwnProperty(key)) {
                Module[key] = moduleOverrides[key];
            }
        }
        moduleOverrides = null;
        if (Module["arguments"])
            arguments_ = Module["arguments"];
        if (Module["thisProgram"])
            thisProgram = Module["thisProgram"];
        if (Module["quit"])
            quit_ = Module["quit"];
        var wasmBinary;
        if (Module["wasmBinary"])
            wasmBinary = Module["wasmBinary"];
        var noExitRuntime = Module["noExitRuntime"] || true;
        if (typeof WebAssembly !== "object") {
            abort("no native wasm support detected");
        }
        var wasmMemory;
        var ABORT = false;
        var EXITSTATUS;
        var UTF8Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : undefined;
        function UTF8ArrayToString(heap, idx, maxBytesToRead) { var endIdx = idx + maxBytesToRead; var endPtr = idx; while (heap[endPtr] && !(endPtr >= endIdx))
            ++endPtr; if (endPtr - idx > 16 && heap.subarray && UTF8Decoder) {
            return UTF8Decoder.decode(heap.subarray(idx, endPtr));
        }
        else {
            var str = "";
            while (idx < endPtr) {
                var u0 = heap[idx++];
                if (!(u0 & 128)) {
                    str += String.fromCharCode(u0);
                    continue;
                }
                var u1 = heap[idx++] & 63;
                if ((u0 & 224) == 192) {
                    str += String.fromCharCode((u0 & 31) << 6 | u1);
                    continue;
                }
                var u2 = heap[idx++] & 63;
                if ((u0 & 240) == 224) {
                    u0 = (u0 & 15) << 12 | u1 << 6 | u2;
                }
                else {
                    u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heap[idx++] & 63;
                }
                if (u0 < 65536) {
                    str += String.fromCharCode(u0);
                }
                else {
                    var ch = u0 - 65536;
                    str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
                }
            }
        } return str; }
        function UTF8ToString(ptr, maxBytesToRead) { return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : ""; }
        var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
        function updateGlobalBufferAndViews(buf) { buffer = buf; Module["HEAP8"] = HEAP8 = new Int8Array(buf); Module["HEAP16"] = HEAP16 = new Int16Array(buf); Module["HEAP32"] = HEAP32 = new Int32Array(buf); Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf); Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf); Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf); Module["HEAPF32"] = HEAPF32 = new Float32Array(buf); Module["HEAPF64"] = HEAPF64 = new Float64Array(buf); }
        var INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 16777216;
        var wasmTable;
        var __ATPRERUN__ = [];
        var __ATINIT__ = [];
        var __ATMAIN__ = [];
        var __ATPOSTRUN__ = [];
        var runtimeInitialized = false;
        var runtimeExited = false;
        __ATINIT__.push({ func: function () { ___wasm_call_ctors(); } });
        function preRun() { if (Module["preRun"]) {
            if (typeof Module["preRun"] == "function")
                Module["preRun"] = [Module["preRun"]];
            while (Module["preRun"].length) {
                addOnPreRun(Module["preRun"].shift());
            }
        } callRuntimeCallbacks(__ATPRERUN__); }
        function initRuntime() { runtimeInitialized = true; callRuntimeCallbacks(__ATINIT__); }
        function preMain() { callRuntimeCallbacks(__ATMAIN__); }
        function exitRuntime() { runtimeExited = true; }
        function postRun() { if (Module["postRun"]) {
            if (typeof Module["postRun"] == "function")
                Module["postRun"] = [Module["postRun"]];
            while (Module["postRun"].length) {
                addOnPostRun(Module["postRun"].shift());
            }
        } callRuntimeCallbacks(__ATPOSTRUN__); }
        function addOnPreRun(cb) { __ATPRERUN__.unshift(cb); }
        function addOnPostRun(cb) { __ATPOSTRUN__.unshift(cb); }
        var runDependencies = 0;
        var runDependencyWatcher = null;
        var dependenciesFulfilled = null;
        function addRunDependency(id) { runDependencies++; if (Module["monitorRunDependencies"]) {
            Module["monitorRunDependencies"](runDependencies);
        } }
        function removeRunDependency(id) { runDependencies--; if (Module["monitorRunDependencies"]) {
            Module["monitorRunDependencies"](runDependencies);
        } if (runDependencies == 0) {
            if (runDependencyWatcher !== null) {
                clearInterval(runDependencyWatcher);
                runDependencyWatcher = null;
            }
            if (dependenciesFulfilled) {
                var callback = dependenciesFulfilled;
                dependenciesFulfilled = null;
                callback();
            }
        } }
        Module["preloadedImages"] = {};
        Module["preloadedAudios"] = {};
        function abort(what) { if (Module["onAbort"]) {
            Module["onAbort"](what);
        } what += ""; err(what); ABORT = true; EXITSTATUS = 1; what = "abort(" + what + "). Build with -s ASSERTIONS=1 for more info."; var e = new WebAssembly.RuntimeError(what); readyPromiseReject(e); throw e; }
        function hasPrefix(str, prefix) { return String.prototype.startsWith ? str.startsWith(prefix) : str.indexOf(prefix) === 0; }
        var dataURIPrefix = "data:application/octet-stream;base64,";
        function isDataURI(filename) { return hasPrefix(filename, dataURIPrefix); }
        var wasmBinaryFile = "binjgb.wasm";
        if (!isDataURI(wasmBinaryFile)) {
            wasmBinaryFile = locateFile(wasmBinaryFile);
        }
        function getBinary(file) { try {
            if (file == wasmBinaryFile && wasmBinary) {
                return new Uint8Array(wasmBinary);
            }
            if (readBinary) {
                return readBinary(file);
            }
            else {
                throw "both async and sync fetching of the wasm failed";
            }
        }
        catch (err) {
            abort(err);
        } }
        function getBinaryPromise() { if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
            if (typeof fetch === "function") {
                return fetch(wasmBinaryFile, { credentials: "same-origin" }).then(function (response) { if (!response["ok"]) {
                    throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
                } return response["arrayBuffer"](); }).catch(function () { return getBinary(wasmBinaryFile); });
            }
        } return Promise.resolve().then(function () { return getBinary(wasmBinaryFile); }); }
        function createWasm() { var info = { "a": asmLibraryArg }; function receiveInstance(instance, module) { var exports = instance.exports; Module["asm"] = exports; wasmMemory = Module["asm"]["g"]; updateGlobalBufferAndViews(wasmMemory.buffer); wasmTable = Module["asm"]["H"]; removeRunDependency("wasm-instantiate"); } addRunDependency("wasm-instantiate"); function receiveInstantiatedSource(output) { receiveInstance(output["instance"]); } function instantiateArrayBuffer(receiver) { return getBinaryPromise().then(function (binary) { return WebAssembly.instantiate(binary, info); }).then(receiver, function (reason) { err("failed to asynchronously prepare wasm: " + reason); abort(reason); }); } function instantiateAsync() { if (!wasmBinary && typeof WebAssembly.instantiateStreaming === "function" && !isDataURI(wasmBinaryFile) && typeof fetch === "function") {
            return fetch(wasmBinaryFile, { credentials: "same-origin" }).then(function (response) { var result = WebAssembly.instantiateStreaming(response, info); return result.then(receiveInstantiatedSource, function (reason) { err("wasm streaming compile failed: " + reason); err("falling back to ArrayBuffer instantiation"); return instantiateArrayBuffer(receiveInstantiatedSource); }); });
        }
        else {
            return instantiateArrayBuffer(receiveInstantiatedSource);
        } } if (Module["instantiateWasm"]) {
            try {
                var exports = Module["instantiateWasm"](info, receiveInstance);
                return exports;
            }
            catch (e) {
                err("Module.instantiateWasm callback failed with error: " + e);
                return false;
            }
        } instantiateAsync().catch(readyPromiseReject); return {}; }
        function callRuntimeCallbacks(callbacks) { while (callbacks.length > 0) {
            var callback = callbacks.shift();
            if (typeof callback == "function") {
                callback(Module);
                continue;
            }
            var func = callback.func;
            if (typeof func === "number") {
                if (callback.arg === undefined) {
                    wasmTable.get(func)();
                }
                else {
                    wasmTable.get(func)(callback.arg);
                }
            }
            else {
                func(callback.arg === undefined ? null : callback.arg);
            }
        } }
        function _emscripten_memcpy_big(dest, src, num) { HEAPU8.copyWithin(dest, src, src + num); }
        function abortOnCannotGrowMemory(requestedSize) { abort("OOM"); }
        function _emscripten_resize_heap(requestedSize) { abortOnCannotGrowMemory(requestedSize); }
        function _exit(status) { exit(status); }
        var SYSCALLS = { mappings: {}, buffers: [null, [], []], printChar: function (stream, curr) { var buffer = SYSCALLS.buffers[stream]; if (curr === 0 || curr === 10) {
                (stream === 1 ? out : err)(UTF8ArrayToString(buffer, 0));
                buffer.length = 0;
            }
            else {
                buffer.push(curr);
            } }, varargs: undefined, get: function () { SYSCALLS.varargs += 4; var ret = HEAP32[SYSCALLS.varargs - 4 >> 2]; return ret; }, getStr: function (ptr) { var ret = UTF8ToString(ptr); return ret; }, get64: function (low, high) { return low; } };
        function _fd_close(fd) { return 0; }
        function _fd_seek(fd, offset_low, offset_high, whence, newOffset) { }
        function _fd_write(fd, iov, iovcnt, pnum) { var num = 0; for (var i = 0; i < iovcnt; i++) {
            var ptr = HEAP32[iov + i * 8 >> 2];
            var len = HEAP32[iov + (i * 8 + 4) >> 2];
            for (var j = 0; j < len; j++) {
                SYSCALLS.printChar(fd, HEAPU8[ptr + j]);
            }
            num += len;
        } HEAP32[pnum >> 2] = num; return 0; }
        var asmLibraryArg = { "d": _emscripten_memcpy_big, "e": _emscripten_resize_heap, "b": _exit, "f": _fd_close, "c": _fd_seek, "a": _fd_write };
        var asm = createWasm();
        var ___wasm_call_ctors = Module["___wasm_call_ctors"] = function () { return (___wasm_call_ctors = Module["___wasm_call_ctors"] = Module["asm"]["h"]).apply(null, arguments); };
        var _malloc = Module["_malloc"] = function () { return (_malloc = Module["_malloc"] = Module["asm"]["i"]).apply(null, arguments); };
        var _emulator_set_builtin_palette = Module["_emulator_set_builtin_palette"] = function () { return (_emulator_set_builtin_palette = Module["_emulator_set_builtin_palette"] = Module["asm"]["j"]).apply(null, arguments); };
        var _emulator_was_ext_ram_updated = Module["_emulator_was_ext_ram_updated"] = function () { return (_emulator_was_ext_ram_updated = Module["_emulator_was_ext_ram_updated"] = Module["asm"]["k"]).apply(null, arguments); };
        var _emulator_read_ext_ram = Module["_emulator_read_ext_ram"] = function () { return (_emulator_read_ext_ram = Module["_emulator_read_ext_ram"] = Module["asm"]["l"]).apply(null, arguments); };
        var _emulator_write_ext_ram = Module["_emulator_write_ext_ram"] = function () { return (_emulator_write_ext_ram = Module["_emulator_write_ext_ram"] = Module["asm"]["m"]).apply(null, arguments); };
        var _file_data_delete = Module["_file_data_delete"] = function () { return (_file_data_delete = Module["_file_data_delete"] = Module["asm"]["n"]).apply(null, arguments); };
        var _free = Module["_free"] = function () { return (_free = Module["_free"] = Module["asm"]["o"]).apply(null, arguments); };
        var _emulator_delete = Module["_emulator_delete"] = function () { return (_emulator_delete = Module["_emulator_delete"] = Module["asm"]["p"]).apply(null, arguments); };
        var _emulator_get_PC = Module["_emulator_get_PC"] = function () { return (_emulator_get_PC = Module["_emulator_get_PC"] = Module["asm"]["q"]).apply(null, arguments); };
        var _emulator_get_A = Module["_emulator_get_A"] = function () { return (_emulator_get_A = Module["_emulator_get_A"] = Module["asm"]["r"]).apply(null, arguments); };
        var _emulator_get_BC = Module["_emulator_get_BC"] = function () { return (_emulator_get_BC = Module["_emulator_get_BC"] = Module["asm"]["s"]).apply(null, arguments); };
        var _emulator_get_DE = Module["_emulator_get_DE"] = function () { return (_emulator_get_DE = Module["_emulator_get_DE"] = Module["asm"]["t"]).apply(null, arguments); };
        var _emulator_get_HL = Module["_emulator_get_HL"] = function () { return (_emulator_get_HL = Module["_emulator_get_HL"] = Module["asm"]["u"]).apply(null, arguments); };
        var _emulator_get_F = Module["_emulator_get_F"] = function () { return (_emulator_get_F = Module["_emulator_get_F"] = Module["asm"]["v"]).apply(null, arguments); };
        var _emulator_get_SP = Module["_emulator_get_SP"] = function () { return (_emulator_get_SP = Module["_emulator_get_SP"] = Module["asm"]["w"]).apply(null, arguments); };
        var _emulator_set_PC = Module["_emulator_set_PC"] = function () { return (_emulator_set_PC = Module["_emulator_set_PC"] = Module["asm"]["x"]).apply(null, arguments); };
        var _emulator_set_breakpoint = Module["_emulator_set_breakpoint"] = function () { return (_emulator_set_breakpoint = Module["_emulator_set_breakpoint"] = Module["asm"]["y"]).apply(null, arguments); };
        var _emulator_clear_breakpoints = Module["_emulator_clear_breakpoints"] = function () { return (_emulator_clear_breakpoints = Module["_emulator_clear_breakpoints"] = Module["asm"]["z"]).apply(null, arguments); };
        var _emulator_render_vram = Module["_emulator_render_vram"] = function () { return (_emulator_render_vram = Module["_emulator_render_vram"] = Module["asm"]["A"]).apply(null, arguments); };
        var _emulator_render_background = Module["_emulator_render_background"] = function () { return (_emulator_render_background = Module["_emulator_render_background"] = Module["asm"]["B"]).apply(null, arguments); };
        var _emulator_get_wram_ptr = Module["_emulator_get_wram_ptr"] = function () { return (_emulator_get_wram_ptr = Module["_emulator_get_wram_ptr"] = Module["asm"]["C"]).apply(null, arguments); };
        var _emulator_get_hram_ptr = Module["_emulator_get_hram_ptr"] = function () { return (_emulator_get_hram_ptr = Module["_emulator_get_hram_ptr"] = Module["asm"]["D"]).apply(null, arguments); };
        var _emulator_read_mem = Module["_emulator_read_mem"] = function () { return (_emulator_read_mem = Module["_emulator_read_mem"] = Module["asm"]["E"]).apply(null, arguments); };
        var _emulator_write_mem = Module["_emulator_write_mem"] = function () { return (_emulator_write_mem = Module["_emulator_write_mem"] = Module["asm"]["F"]).apply(null, arguments); };
        var _set_audio_channel_mute = Module["_set_audio_channel_mute"] = function () { return (_set_audio_channel_mute = Module["_set_audio_channel_mute"] = Module["asm"]["G"]).apply(null, arguments); };
        var _joypad_new = Module["_joypad_new"] = function () { return (_joypad_new = Module["_joypad_new"] = Module["asm"]["I"]).apply(null, arguments); };
        var _joypad_delete = Module["_joypad_delete"] = function () { return (_joypad_delete = Module["_joypad_delete"] = Module["asm"]["J"]).apply(null, arguments); };
        var _rewind_append = Module["_rewind_append"] = function () { return (_rewind_append = Module["_rewind_append"] = Module["asm"]["K"]).apply(null, arguments); };
        var _rewind_delete = Module["_rewind_delete"] = function () { return (_rewind_delete = Module["_rewind_delete"] = Module["asm"]["L"]).apply(null, arguments); };
        var _emulator_new_simple = Module["_emulator_new_simple"] = function () { return (_emulator_new_simple = Module["_emulator_new_simple"] = Module["asm"]["M"]).apply(null, arguments); };
        var _emulator_get_ticks_f64 = Module["_emulator_get_ticks_f64"] = function () { return (_emulator_get_ticks_f64 = Module["_emulator_get_ticks_f64"] = Module["asm"]["N"]).apply(null, arguments); };
        var _emulator_run_until_f64 = Module["_emulator_run_until_f64"] = function () { return (_emulator_run_until_f64 = Module["_emulator_run_until_f64"] = Module["asm"]["O"]).apply(null, arguments); };
        var _rewind_get_newest_ticks_f64 = Module["_rewind_get_newest_ticks_f64"] = function () { return (_rewind_get_newest_ticks_f64 = Module["_rewind_get_newest_ticks_f64"] = Module["asm"]["P"]).apply(null, arguments); };
        var _rewind_get_oldest_ticks_f64 = Module["_rewind_get_oldest_ticks_f64"] = function () { return (_rewind_get_oldest_ticks_f64 = Module["_rewind_get_oldest_ticks_f64"] = Module["asm"]["Q"]).apply(null, arguments); };
        var _emulator_set_default_joypad_callback = Module["_emulator_set_default_joypad_callback"] = function () { return (_emulator_set_default_joypad_callback = Module["_emulator_set_default_joypad_callback"] = Module["asm"]["R"]).apply(null, arguments); };
        var _emulator_set_bw_palette_simple = Module["_emulator_set_bw_palette_simple"] = function () { return (_emulator_set_bw_palette_simple = Module["_emulator_set_bw_palette_simple"] = Module["asm"]["S"]).apply(null, arguments); };
        var _rewind_new_simple = Module["_rewind_new_simple"] = function () { return (_rewind_new_simple = Module["_rewind_new_simple"] = Module["asm"]["T"]).apply(null, arguments); };
        var _rewind_begin = Module["_rewind_begin"] = function () { return (_rewind_begin = Module["_rewind_begin"] = Module["asm"]["U"]).apply(null, arguments); };
        var _emulator_set_rewind_joypad_callback = Module["_emulator_set_rewind_joypad_callback"] = function () { return (_emulator_set_rewind_joypad_callback = Module["_emulator_set_rewind_joypad_callback"] = Module["asm"]["V"]).apply(null, arguments); };
        var _rewind_to_ticks_wrapper = Module["_rewind_to_ticks_wrapper"] = function () { return (_rewind_to_ticks_wrapper = Module["_rewind_to_ticks_wrapper"] = Module["asm"]["W"]).apply(null, arguments); };
        var _rewind_end = Module["_rewind_end"] = function () { return (_rewind_end = Module["_rewind_end"] = Module["asm"]["X"]).apply(null, arguments); };
        var _set_joyp_up = Module["_set_joyp_up"] = function () { return (_set_joyp_up = Module["_set_joyp_up"] = Module["asm"]["Y"]).apply(null, arguments); };
        var _set_joyp_down = Module["_set_joyp_down"] = function () { return (_set_joyp_down = Module["_set_joyp_down"] = Module["asm"]["Z"]).apply(null, arguments); };
        var _set_joyp_left = Module["_set_joyp_left"] = function () { return (_set_joyp_left = Module["_set_joyp_left"] = Module["asm"]["_"]).apply(null, arguments); };
        var _set_joyp_right = Module["_set_joyp_right"] = function () { return (_set_joyp_right = Module["_set_joyp_right"] = Module["asm"]["$"]).apply(null, arguments); };
        var _set_joyp_B = Module["_set_joyp_B"] = function () { return (_set_joyp_B = Module["_set_joyp_B"] = Module["asm"]["aa"]).apply(null, arguments); };
        var _set_joyp_A = Module["_set_joyp_A"] = function () { return (_set_joyp_A = Module["_set_joyp_A"] = Module["asm"]["ba"]).apply(null, arguments); };
        var _set_joyp_start = Module["_set_joyp_start"] = function () { return (_set_joyp_start = Module["_set_joyp_start"] = Module["asm"]["ca"]).apply(null, arguments); };
        var _set_joyp_select = Module["_set_joyp_select"] = function () { return (_set_joyp_select = Module["_set_joyp_select"] = Module["asm"]["da"]).apply(null, arguments); };
        var _get_frame_buffer_ptr = Module["_get_frame_buffer_ptr"] = function () { return (_get_frame_buffer_ptr = Module["_get_frame_buffer_ptr"] = Module["asm"]["ea"]).apply(null, arguments); };
        var _get_frame_buffer_size = Module["_get_frame_buffer_size"] = function () { return (_get_frame_buffer_size = Module["_get_frame_buffer_size"] = Module["asm"]["fa"]).apply(null, arguments); };
        var _get_sgb_frame_buffer_ptr = Module["_get_sgb_frame_buffer_ptr"] = function () { return (_get_sgb_frame_buffer_ptr = Module["_get_sgb_frame_buffer_ptr"] = Module["asm"]["ga"]).apply(null, arguments); };
        var _get_sgb_frame_buffer_size = Module["_get_sgb_frame_buffer_size"] = function () { return (_get_sgb_frame_buffer_size = Module["_get_sgb_frame_buffer_size"] = Module["asm"]["ha"]).apply(null, arguments); };
        var _get_audio_buffer_ptr = Module["_get_audio_buffer_ptr"] = function () { return (_get_audio_buffer_ptr = Module["_get_audio_buffer_ptr"] = Module["asm"]["ia"]).apply(null, arguments); };
        var _get_audio_buffer_capacity = Module["_get_audio_buffer_capacity"] = function () { return (_get_audio_buffer_capacity = Module["_get_audio_buffer_capacity"] = Module["asm"]["ja"]).apply(null, arguments); };
        var _ext_ram_file_data_new = Module["_ext_ram_file_data_new"] = function () { return (_ext_ram_file_data_new = Module["_ext_ram_file_data_new"] = Module["asm"]["ka"]).apply(null, arguments); };
        var _get_file_data_ptr = Module["_get_file_data_ptr"] = function () { return (_get_file_data_ptr = Module["_get_file_data_ptr"] = Module["asm"]["la"]).apply(null, arguments); };
        var _get_file_data_size = Module["_get_file_data_size"] = function () { return (_get_file_data_size = Module["_get_file_data_size"] = Module["asm"]["ma"]).apply(null, arguments); };
        var calledRun;
        function ExitStatus(status) { this.name = "ExitStatus"; this.message = "Program terminated with exit(" + status + ")"; this.status = status; }
        dependenciesFulfilled = function runCaller() { if (!calledRun)
            run(); if (!calledRun)
            dependenciesFulfilled = runCaller; };
        function run(args) { args = args || arguments_; if (runDependencies > 0) {
            return;
        } preRun(); if (runDependencies > 0) {
            return;
        } function doRun() { if (calledRun)
            return; calledRun = true; Module["calledRun"] = true; if (ABORT)
            return; initRuntime(); preMain(); readyPromiseResolve(Module); if (Module["onRuntimeInitialized"])
            Module["onRuntimeInitialized"](); postRun(); } if (Module["setStatus"]) {
            Module["setStatus"]("Running...");
            setTimeout(function () { setTimeout(function () { Module["setStatus"](""); }, 1); doRun(); }, 1);
        }
        else {
            doRun();
        } }
        Module["run"] = run;
        function exit(status, implicit) { if (implicit && noExitRuntime && status === 0) {
            return;
        } if (noExitRuntime) { }
        else {
            EXITSTATUS = status;
            exitRuntime();
            if (Module["onExit"])
                Module["onExit"](status);
            ABORT = true;
        } quit_(status, new ExitStatus(status)); }
        if (Module["preInit"]) {
            if (typeof Module["preInit"] == "function")
                Module["preInit"] = [Module["preInit"]];
            while (Module["preInit"].length > 0) {
                Module["preInit"].pop()();
            }
        }
        run();
        return Binjgb.ready;
    });
})();
if (true)
    module.exports = Binjgb;
else {}


/***/ }),

/***/ 41649:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var createRgbAsm = (() => {
    var _scriptDir = "file:///D:/Emulators/New%20folder/gb-studio-develop/gb-studio-develop/appData/wasm/rgbds/rgbasm.js";
    return (function (createRgbAsm = {}) {
        var Module = typeof createRgbAsm != "undefined" ? createRgbAsm : {};
        var readyPromiseResolve, readyPromiseReject;
        Module["ready"] = new Promise((resolve, reject) => { readyPromiseResolve = resolve; readyPromiseReject = reject; });
        var moduleOverrides = Object.assign({}, Module);
        var arguments_ = [];
        var thisProgram = "./this.program";
        var quit_ = (status, toThrow) => { throw toThrow; };
        var ENVIRONMENT_IS_WEB = true;
        var ENVIRONMENT_IS_WORKER = false;
        var scriptDirectory = "";
        function locateFile(path) { if (Module["locateFile"]) {
            return Module["locateFile"](path, scriptDirectory);
        } return scriptDirectory + path; }
        var read_, readAsync, readBinary, setWindowTitle;
        if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
            if (ENVIRONMENT_IS_WORKER) {
                scriptDirectory = self.location.href;
            }
            else if (typeof document != "undefined" && document.currentScript) {
                scriptDirectory = document.currentScript.src;
            }
            if (_scriptDir) {
                scriptDirectory = _scriptDir;
            }
            if (scriptDirectory.indexOf("blob:") !== 0) {
                scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1);
            }
            else {
                scriptDirectory = "";
            }
            {
                read_ = url => { var xhr = new XMLHttpRequest; xhr.open("GET", url, false); xhr.send(null); return xhr.responseText; };
                if (ENVIRONMENT_IS_WORKER) {
                    readBinary = url => { var xhr = new XMLHttpRequest; xhr.open("GET", url, false); xhr.responseType = "arraybuffer"; xhr.send(null); return new Uint8Array(xhr.response); };
                }
                readAsync = (url, onload, onerror) => { var xhr = new XMLHttpRequest; xhr.open("GET", url, true); xhr.responseType = "arraybuffer"; xhr.onload = () => { if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                    onload(xhr.response);
                    return;
                } onerror(); }; xhr.onerror = onerror; xhr.send(null); };
            }
            setWindowTitle = title => document.title = title;
        }
        else { }
        var out = Module["print"] || console.log.bind(console);
        var err = Module["printErr"] || console.warn.bind(console);
        Object.assign(Module, moduleOverrides);
        moduleOverrides = null;
        if (Module["arguments"])
            arguments_ = Module["arguments"];
        if (Module["thisProgram"])
            thisProgram = Module["thisProgram"];
        if (Module["quit"])
            quit_ = Module["quit"];
        var wasmBinary;
        if (Module["wasmBinary"])
            wasmBinary = Module["wasmBinary"];
        var noExitRuntime = Module["noExitRuntime"] || true;
        if (typeof WebAssembly != "object") {
            abort("no native wasm support detected");
        }
        var wasmMemory;
        var ABORT = false;
        var EXITSTATUS;
        function assert(condition, text) { if (!condition) {
            abort(text);
        } }
        var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
        function updateMemoryViews() { var b = wasmMemory.buffer; Module["HEAP8"] = HEAP8 = new Int8Array(b); Module["HEAP16"] = HEAP16 = new Int16Array(b); Module["HEAP32"] = HEAP32 = new Int32Array(b); Module["HEAPU8"] = HEAPU8 = new Uint8Array(b); Module["HEAPU16"] = HEAPU16 = new Uint16Array(b); Module["HEAPU32"] = HEAPU32 = new Uint32Array(b); Module["HEAPF32"] = HEAPF32 = new Float32Array(b); Module["HEAPF64"] = HEAPF64 = new Float64Array(b); }
        var wasmTable;
        var __ATPRERUN__ = [];
        var __ATINIT__ = [];
        var __ATMAIN__ = [];
        var __ATPOSTRUN__ = [];
        var runtimeInitialized = false;
        var runtimeKeepaliveCounter = 0;
        function keepRuntimeAlive() { return noExitRuntime || runtimeKeepaliveCounter > 0; }
        function preRun() { if (Module["preRun"]) {
            if (typeof Module["preRun"] == "function")
                Module["preRun"] = [Module["preRun"]];
            while (Module["preRun"].length) {
                addOnPreRun(Module["preRun"].shift());
            }
        } callRuntimeCallbacks(__ATPRERUN__); }
        function initRuntime() { runtimeInitialized = true; if (!Module["noFSInit"] && !FS.init.initialized)
            FS.init(); FS.ignorePermissions = false; TTY.init(); callRuntimeCallbacks(__ATINIT__); }
        function preMain() { callRuntimeCallbacks(__ATMAIN__); }
        function postRun() { if (Module["postRun"]) {
            if (typeof Module["postRun"] == "function")
                Module["postRun"] = [Module["postRun"]];
            while (Module["postRun"].length) {
                addOnPostRun(Module["postRun"].shift());
            }
        } callRuntimeCallbacks(__ATPOSTRUN__); }
        function addOnPreRun(cb) { __ATPRERUN__.unshift(cb); }
        function addOnInit(cb) { __ATINIT__.unshift(cb); }
        function addOnPostRun(cb) { __ATPOSTRUN__.unshift(cb); }
        var runDependencies = 0;
        var runDependencyWatcher = null;
        var dependenciesFulfilled = null;
        function getUniqueRunDependency(id) { return id; }
        function addRunDependency(id) { runDependencies++; if (Module["monitorRunDependencies"]) {
            Module["monitorRunDependencies"](runDependencies);
        } }
        function removeRunDependency(id) { runDependencies--; if (Module["monitorRunDependencies"]) {
            Module["monitorRunDependencies"](runDependencies);
        } if (runDependencies == 0) {
            if (runDependencyWatcher !== null) {
                clearInterval(runDependencyWatcher);
                runDependencyWatcher = null;
            }
            if (dependenciesFulfilled) {
                var callback = dependenciesFulfilled;
                dependenciesFulfilled = null;
                callback();
            }
        } }
        function abort(what) { if (Module["onAbort"]) {
            Module["onAbort"](what);
        } what = "Aborted(" + what + ")"; err(what); ABORT = true; EXITSTATUS = 1; what += ". Build with -sASSERTIONS for more info."; var e = new WebAssembly.RuntimeError(what); readyPromiseReject(e); throw e; }
        var dataURIPrefix = "data:application/octet-stream;base64,";
        function isDataURI(filename) { return filename.startsWith(dataURIPrefix); }
        var wasmBinaryFile;
        if (Module["locateFile"]) {
            wasmBinaryFile = "rgbasm.wasm";
            if (!isDataURI(wasmBinaryFile)) {
                wasmBinaryFile = locateFile(wasmBinaryFile);
            }
        }
        else {
            wasmBinaryFile = new URL(/* asset import */ __webpack_require__(46521), __webpack_require__.b).href;
        }
        function getBinary(file) { try {
            if (file == wasmBinaryFile && wasmBinary) {
                return new Uint8Array(wasmBinary);
            }
            if (readBinary) {
                return readBinary(file);
            }
            throw "both async and sync fetching of the wasm failed";
        }
        catch (err) {
            abort(err);
        } }
        function getBinaryPromise(binaryFile) { if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
            if (typeof fetch == "function") {
                return fetch(binaryFile, { credentials: "same-origin" }).then(response => { if (!response["ok"]) {
                    throw "failed to load wasm binary file at '" + binaryFile + "'";
                } return response["arrayBuffer"](); }).catch(() => getBinary(binaryFile));
            }
        } return Promise.resolve().then(() => getBinary(binaryFile)); }
        function instantiateArrayBuffer(binaryFile, imports, receiver) { return getBinaryPromise(binaryFile).then(binary => { return WebAssembly.instantiate(binary, imports); }).then(instance => { return instance; }).then(receiver, reason => { err("failed to asynchronously prepare wasm: " + reason); abort(reason); }); }
        function instantiateAsync(binary, binaryFile, imports, callback) { if (!binary && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(binaryFile) && typeof fetch == "function") {
            return fetch(binaryFile, { credentials: "same-origin" }).then(response => { var result = WebAssembly.instantiateStreaming(response, imports); return result.then(callback, function (reason) { err("wasm streaming compile failed: " + reason); err("falling back to ArrayBuffer instantiation"); return instantiateArrayBuffer(binaryFile, imports, callback); }); });
        }
        else {
            return instantiateArrayBuffer(binaryFile, imports, callback);
        } }
        function createWasm() { var info = { "a": wasmImports }; function receiveInstance(instance, module) { var exports = instance.exports; Module["asm"] = exports; wasmMemory = Module["asm"]["v"]; updateMemoryViews(); wasmTable = Module["asm"]["z"]; addOnInit(Module["asm"]["w"]); removeRunDependency("wasm-instantiate"); return exports; } addRunDependency("wasm-instantiate"); function receiveInstantiationResult(result) { receiveInstance(result["instance"]); } if (Module["instantiateWasm"]) {
            try {
                return Module["instantiateWasm"](info, receiveInstance);
            }
            catch (e) {
                err("Module.instantiateWasm callback failed with error: " + e);
                readyPromiseReject(e);
            }
        } instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult).catch(readyPromiseReject); return {}; }
        var tempDouble;
        var tempI64;
        function ExitStatus(status) { this.name = "ExitStatus"; this.message = "Program terminated with exit(" + status + ")"; this.status = status; }
        function callRuntimeCallbacks(callbacks) { while (callbacks.length > 0) {
            callbacks.shift()(Module);
        } }
        var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : undefined;
        function UTF8ArrayToString(heapOrArray, idx, maxBytesToRead) { var endIdx = idx + maxBytesToRead; var endPtr = idx; while (heapOrArray[endPtr] && !(endPtr >= endIdx))
            ++endPtr; if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
            return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
        } var str = ""; while (idx < endPtr) {
            var u0 = heapOrArray[idx++];
            if (!(u0 & 128)) {
                str += String.fromCharCode(u0);
                continue;
            }
            var u1 = heapOrArray[idx++] & 63;
            if ((u0 & 224) == 192) {
                str += String.fromCharCode((u0 & 31) << 6 | u1);
                continue;
            }
            var u2 = heapOrArray[idx++] & 63;
            if ((u0 & 240) == 224) {
                u0 = (u0 & 15) << 12 | u1 << 6 | u2;
            }
            else {
                u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
            }
            if (u0 < 65536) {
                str += String.fromCharCode(u0);
            }
            else {
                var ch = u0 - 65536;
                str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
            }
        } return str; }
        function UTF8ToString(ptr, maxBytesToRead) { return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : ""; }
        function ___assert_fail(condition, filename, line, func) { abort("Assertion failed: " + UTF8ToString(condition) + ", at: " + [filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function"]); }
        function setErrNo(value) { HEAP32[___errno_location() >> 2] = value; return value; }
        var PATH = { isAbs: path => path.charAt(0) === "/", splitPath: filename => { var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/; return splitPathRe.exec(filename).slice(1); }, normalizeArray: (parts, allowAboveRoot) => { var up = 0; for (var i = parts.length - 1; i >= 0; i--) {
                var last = parts[i];
                if (last === ".") {
                    parts.splice(i, 1);
                }
                else if (last === "..") {
                    parts.splice(i, 1);
                    up++;
                }
                else if (up) {
                    parts.splice(i, 1);
                    up--;
                }
            } if (allowAboveRoot) {
                for (; up; up--) {
                    parts.unshift("..");
                }
            } return parts; }, normalize: path => { var isAbsolute = PATH.isAbs(path), trailingSlash = path.substr(-1) === "/"; path = PATH.normalizeArray(path.split("/").filter(p => !!p), !isAbsolute).join("/"); if (!path && !isAbsolute) {
                path = ".";
            } if (path && trailingSlash) {
                path += "/";
            } return (isAbsolute ? "/" : "") + path; }, dirname: path => { var result = PATH.splitPath(path), root = result[0], dir = result[1]; if (!root && !dir) {
                return ".";
            } if (dir) {
                dir = dir.substr(0, dir.length - 1);
            } return root + dir; }, basename: path => { if (path === "/")
                return "/"; path = PATH.normalize(path); path = path.replace(/\/$/, ""); var lastSlash = path.lastIndexOf("/"); if (lastSlash === -1)
                return path; return path.substr(lastSlash + 1); }, join: function () { var paths = Array.prototype.slice.call(arguments); return PATH.normalize(paths.join("/")); }, join2: (l, r) => { return PATH.normalize(l + "/" + r); } };
        function initRandomFill() { if (typeof crypto == "object" && typeof crypto["getRandomValues"] == "function") {
            return view => crypto.getRandomValues(view);
        }
        else
            abort("initRandomDevice"); }
        function randomFill(view) { return (randomFill = initRandomFill())(view); }
        var PATH_FS = { resolve: function () { var resolvedPath = "", resolvedAbsolute = false; for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
                var path = i >= 0 ? arguments[i] : FS.cwd();
                if (typeof path != "string") {
                    throw new TypeError("Arguments to path.resolve must be strings");
                }
                else if (!path) {
                    return "";
                }
                resolvedPath = path + "/" + resolvedPath;
                resolvedAbsolute = PATH.isAbs(path);
            } resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter(p => !!p), !resolvedAbsolute).join("/"); return (resolvedAbsolute ? "/" : "") + resolvedPath || "."; }, relative: (from, to) => { from = PATH_FS.resolve(from).substr(1); to = PATH_FS.resolve(to).substr(1); function trim(arr) { var start = 0; for (; start < arr.length; start++) {
                if (arr[start] !== "")
                    break;
            } var end = arr.length - 1; for (; end >= 0; end--) {
                if (arr[end] !== "")
                    break;
            } if (start > end)
                return []; return arr.slice(start, end - start + 1); } var fromParts = trim(from.split("/")); var toParts = trim(to.split("/")); var length = Math.min(fromParts.length, toParts.length); var samePartsLength = length; for (var i = 0; i < length; i++) {
                if (fromParts[i] !== toParts[i]) {
                    samePartsLength = i;
                    break;
                }
            } var outputParts = []; for (var i = samePartsLength; i < fromParts.length; i++) {
                outputParts.push("..");
            } outputParts = outputParts.concat(toParts.slice(samePartsLength)); return outputParts.join("/"); } };
        function lengthBytesUTF8(str) { var len = 0; for (var i = 0; i < str.length; ++i) {
            var c = str.charCodeAt(i);
            if (c <= 127) {
                len++;
            }
            else if (c <= 2047) {
                len += 2;
            }
            else if (c >= 55296 && c <= 57343) {
                len += 4;
                ++i;
            }
            else {
                len += 3;
            }
        } return len; }
        function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) { if (!(maxBytesToWrite > 0))
            return 0; var startIdx = outIdx; var endIdx = outIdx + maxBytesToWrite - 1; for (var i = 0; i < str.length; ++i) {
            var u = str.charCodeAt(i);
            if (u >= 55296 && u <= 57343) {
                var u1 = str.charCodeAt(++i);
                u = 65536 + ((u & 1023) << 10) | u1 & 1023;
            }
            if (u <= 127) {
                if (outIdx >= endIdx)
                    break;
                heap[outIdx++] = u;
            }
            else if (u <= 2047) {
                if (outIdx + 1 >= endIdx)
                    break;
                heap[outIdx++] = 192 | u >> 6;
                heap[outIdx++] = 128 | u & 63;
            }
            else if (u <= 65535) {
                if (outIdx + 2 >= endIdx)
                    break;
                heap[outIdx++] = 224 | u >> 12;
                heap[outIdx++] = 128 | u >> 6 & 63;
                heap[outIdx++] = 128 | u & 63;
            }
            else {
                if (outIdx + 3 >= endIdx)
                    break;
                heap[outIdx++] = 240 | u >> 18;
                heap[outIdx++] = 128 | u >> 12 & 63;
                heap[outIdx++] = 128 | u >> 6 & 63;
                heap[outIdx++] = 128 | u & 63;
            }
        } heap[outIdx] = 0; return outIdx - startIdx; }
        function intArrayFromString(stringy, dontAddNull, length) { var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1; var u8array = new Array(len); var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length); if (dontAddNull)
            u8array.length = numBytesWritten; return u8array; }
        var TTY = { ttys: [], init: function () { }, shutdown: function () { }, register: function (dev, ops) { TTY.ttys[dev] = { input: [], output: [], ops: ops }; FS.registerDevice(dev, TTY.stream_ops); }, stream_ops: { open: function (stream) { var tty = TTY.ttys[stream.node.rdev]; if (!tty) {
                    throw new FS.ErrnoError(43);
                } stream.tty = tty; stream.seekable = false; }, close: function (stream) { stream.tty.ops.fsync(stream.tty); }, fsync: function (stream) { stream.tty.ops.fsync(stream.tty); }, read: function (stream, buffer, offset, length, pos) { if (!stream.tty || !stream.tty.ops.get_char) {
                    throw new FS.ErrnoError(60);
                } var bytesRead = 0; for (var i = 0; i < length; i++) {
                    var result;
                    try {
                        result = stream.tty.ops.get_char(stream.tty);
                    }
                    catch (e) {
                        throw new FS.ErrnoError(29);
                    }
                    if (result === undefined && bytesRead === 0) {
                        throw new FS.ErrnoError(6);
                    }
                    if (result === null || result === undefined)
                        break;
                    bytesRead++;
                    buffer[offset + i] = result;
                } if (bytesRead) {
                    stream.node.timestamp = Date.now();
                } return bytesRead; }, write: function (stream, buffer, offset, length, pos) { if (!stream.tty || !stream.tty.ops.put_char) {
                    throw new FS.ErrnoError(60);
                } try {
                    for (var i = 0; i < length; i++) {
                        stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
                    }
                }
                catch (e) {
                    throw new FS.ErrnoError(29);
                } if (length) {
                    stream.node.timestamp = Date.now();
                } return i; } }, default_tty_ops: { get_char: function (tty) { if (!tty.input.length) {
                    var result = null;
                    if (typeof window != "undefined" && typeof window.prompt == "function") {
                        result = window.prompt("Input: ");
                        if (result !== null) {
                            result += "\n";
                        }
                    }
                    else if (typeof readline == "function") {
                        result = readline();
                        if (result !== null) {
                            result += "\n";
                        }
                    }
                    if (!result) {
                        return null;
                    }
                    tty.input = intArrayFromString(result, true);
                } return tty.input.shift(); }, put_char: function (tty, val) { if (val === null || val === 10) {
                    out(UTF8ArrayToString(tty.output, 0));
                    tty.output = [];
                }
                else {
                    if (val != 0)
                        tty.output.push(val);
                } }, fsync: function (tty) { if (tty.output && tty.output.length > 0) {
                    out(UTF8ArrayToString(tty.output, 0));
                    tty.output = [];
                } } }, default_tty1_ops: { put_char: function (tty, val) { if (val === null || val === 10) {
                    err(UTF8ArrayToString(tty.output, 0));
                    tty.output = [];
                }
                else {
                    if (val != 0)
                        tty.output.push(val);
                } }, fsync: function (tty) { if (tty.output && tty.output.length > 0) {
                    err(UTF8ArrayToString(tty.output, 0));
                    tty.output = [];
                } } } };
        function zeroMemory(address, size) { HEAPU8.fill(0, address, address + size); return address; }
        function alignMemory(size, alignment) { return Math.ceil(size / alignment) * alignment; }
        function mmapAlloc(size) { size = alignMemory(size, 65536); var ptr = _emscripten_builtin_memalign(65536, size); if (!ptr)
            return 0; return zeroMemory(ptr, size); }
        var MEMFS = { ops_table: null, mount: function (mount) { return MEMFS.createNode(null, "/", 16384 | 511, 0); }, createNode: function (parent, name, mode, dev) { if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
                throw new FS.ErrnoError(63);
            } if (!MEMFS.ops_table) {
                MEMFS.ops_table = { dir: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, lookup: MEMFS.node_ops.lookup, mknod: MEMFS.node_ops.mknod, rename: MEMFS.node_ops.rename, unlink: MEMFS.node_ops.unlink, rmdir: MEMFS.node_ops.rmdir, readdir: MEMFS.node_ops.readdir, symlink: MEMFS.node_ops.symlink }, stream: { llseek: MEMFS.stream_ops.llseek } }, file: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr }, stream: { llseek: MEMFS.stream_ops.llseek, read: MEMFS.stream_ops.read, write: MEMFS.stream_ops.write, allocate: MEMFS.stream_ops.allocate, mmap: MEMFS.stream_ops.mmap, msync: MEMFS.stream_ops.msync } }, link: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, readlink: MEMFS.node_ops.readlink }, stream: {} }, chrdev: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr }, stream: FS.chrdev_stream_ops } };
            } var node = FS.createNode(parent, name, mode, dev); if (FS.isDir(node.mode)) {
                node.node_ops = MEMFS.ops_table.dir.node;
                node.stream_ops = MEMFS.ops_table.dir.stream;
                node.contents = {};
            }
            else if (FS.isFile(node.mode)) {
                node.node_ops = MEMFS.ops_table.file.node;
                node.stream_ops = MEMFS.ops_table.file.stream;
                node.usedBytes = 0;
                node.contents = null;
            }
            else if (FS.isLink(node.mode)) {
                node.node_ops = MEMFS.ops_table.link.node;
                node.stream_ops = MEMFS.ops_table.link.stream;
            }
            else if (FS.isChrdev(node.mode)) {
                node.node_ops = MEMFS.ops_table.chrdev.node;
                node.stream_ops = MEMFS.ops_table.chrdev.stream;
            } node.timestamp = Date.now(); if (parent) {
                parent.contents[name] = node;
                parent.timestamp = node.timestamp;
            } return node; }, getFileDataAsTypedArray: function (node) { if (!node.contents)
                return new Uint8Array(0); if (node.contents.subarray)
                return node.contents.subarray(0, node.usedBytes); return new Uint8Array(node.contents); }, expandFileStorage: function (node, newCapacity) { var prevCapacity = node.contents ? node.contents.length : 0; if (prevCapacity >= newCapacity)
                return; var CAPACITY_DOUBLING_MAX = 1024 * 1024; newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) >>> 0); if (prevCapacity != 0)
                newCapacity = Math.max(newCapacity, 256); var oldContents = node.contents; node.contents = new Uint8Array(newCapacity); if (node.usedBytes > 0)
                node.contents.set(oldContents.subarray(0, node.usedBytes), 0); }, resizeFileStorage: function (node, newSize) { if (node.usedBytes == newSize)
                return; if (newSize == 0) {
                node.contents = null;
                node.usedBytes = 0;
            }
            else {
                var oldContents = node.contents;
                node.contents = new Uint8Array(newSize);
                if (oldContents) {
                    node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
                }
                node.usedBytes = newSize;
            } }, node_ops: { getattr: function (node) { var attr = {}; attr.dev = FS.isChrdev(node.mode) ? node.id : 1; attr.ino = node.id; attr.mode = node.mode; attr.nlink = 1; attr.uid = 0; attr.gid = 0; attr.rdev = node.rdev; if (FS.isDir(node.mode)) {
                    attr.size = 4096;
                }
                else if (FS.isFile(node.mode)) {
                    attr.size = node.usedBytes;
                }
                else if (FS.isLink(node.mode)) {
                    attr.size = node.link.length;
                }
                else {
                    attr.size = 0;
                } attr.atime = new Date(node.timestamp); attr.mtime = new Date(node.timestamp); attr.ctime = new Date(node.timestamp); attr.blksize = 4096; attr.blocks = Math.ceil(attr.size / attr.blksize); return attr; }, setattr: function (node, attr) { if (attr.mode !== undefined) {
                    node.mode = attr.mode;
                } if (attr.timestamp !== undefined) {
                    node.timestamp = attr.timestamp;
                } if (attr.size !== undefined) {
                    MEMFS.resizeFileStorage(node, attr.size);
                } }, lookup: function (parent, name) { throw FS.genericErrors[44]; }, mknod: function (parent, name, mode, dev) { return MEMFS.createNode(parent, name, mode, dev); }, rename: function (old_node, new_dir, new_name) { if (FS.isDir(old_node.mode)) {
                    var new_node;
                    try {
                        new_node = FS.lookupNode(new_dir, new_name);
                    }
                    catch (e) { }
                    if (new_node) {
                        for (var i in new_node.contents) {
                            throw new FS.ErrnoError(55);
                        }
                    }
                } delete old_node.parent.contents[old_node.name]; old_node.parent.timestamp = Date.now(); old_node.name = new_name; new_dir.contents[new_name] = old_node; new_dir.timestamp = old_node.parent.timestamp; old_node.parent = new_dir; }, unlink: function (parent, name) { delete parent.contents[name]; parent.timestamp = Date.now(); }, rmdir: function (parent, name) { var node = FS.lookupNode(parent, name); for (var i in node.contents) {
                    throw new FS.ErrnoError(55);
                } delete parent.contents[name]; parent.timestamp = Date.now(); }, readdir: function (node) { var entries = [".", ".."]; for (var key in node.contents) {
                    if (!node.contents.hasOwnProperty(key)) {
                        continue;
                    }
                    entries.push(key);
                } return entries; }, symlink: function (parent, newname, oldpath) { var node = MEMFS.createNode(parent, newname, 511 | 40960, 0); node.link = oldpath; return node; }, readlink: function (node) { if (!FS.isLink(node.mode)) {
                    throw new FS.ErrnoError(28);
                } return node.link; } }, stream_ops: { read: function (stream, buffer, offset, length, position) { var contents = stream.node.contents; if (position >= stream.node.usedBytes)
                    return 0; var size = Math.min(stream.node.usedBytes - position, length); if (size > 8 && contents.subarray) {
                    buffer.set(contents.subarray(position, position + size), offset);
                }
                else {
                    for (var i = 0; i < size; i++)
                        buffer[offset + i] = contents[position + i];
                } return size; }, write: function (stream, buffer, offset, length, position, canOwn) { if (!length)
                    return 0; var node = stream.node; node.timestamp = Date.now(); if (buffer.subarray && (!node.contents || node.contents.subarray)) {
                    if (canOwn) {
                        node.contents = buffer.subarray(offset, offset + length);
                        node.usedBytes = length;
                        return length;
                    }
                    else if (node.usedBytes === 0 && position === 0) {
                        node.contents = buffer.slice(offset, offset + length);
                        node.usedBytes = length;
                        return length;
                    }
                    else if (position + length <= node.usedBytes) {
                        node.contents.set(buffer.subarray(offset, offset + length), position);
                        return length;
                    }
                } MEMFS.expandFileStorage(node, position + length); if (node.contents.subarray && buffer.subarray) {
                    node.contents.set(buffer.subarray(offset, offset + length), position);
                }
                else {
                    for (var i = 0; i < length; i++) {
                        node.contents[position + i] = buffer[offset + i];
                    }
                } node.usedBytes = Math.max(node.usedBytes, position + length); return length; }, llseek: function (stream, offset, whence) { var position = offset; if (whence === 1) {
                    position += stream.position;
                }
                else if (whence === 2) {
                    if (FS.isFile(stream.node.mode)) {
                        position += stream.node.usedBytes;
                    }
                } if (position < 0) {
                    throw new FS.ErrnoError(28);
                } return position; }, allocate: function (stream, offset, length) { MEMFS.expandFileStorage(stream.node, offset + length); stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length); }, mmap: function (stream, length, position, prot, flags) { if (!FS.isFile(stream.node.mode)) {
                    throw new FS.ErrnoError(43);
                } var ptr; var allocated; var contents = stream.node.contents; if (!(flags & 2) && contents.buffer === HEAP8.buffer) {
                    allocated = false;
                    ptr = contents.byteOffset;
                }
                else {
                    if (position > 0 || position + length < contents.length) {
                        if (contents.subarray) {
                            contents = contents.subarray(position, position + length);
                        }
                        else {
                            contents = Array.prototype.slice.call(contents, position, position + length);
                        }
                    }
                    allocated = true;
                    ptr = mmapAlloc(length);
                    if (!ptr) {
                        throw new FS.ErrnoError(48);
                    }
                    HEAP8.set(contents, ptr);
                } return { ptr: ptr, allocated: allocated }; }, msync: function (stream, buffer, offset, length, mmapFlags) { MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false); return 0; } } };
        function asyncLoad(url, onload, onerror, noRunDep) { var dep = !noRunDep ? getUniqueRunDependency("al " + url) : ""; readAsync(url, arrayBuffer => { assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).'); onload(new Uint8Array(arrayBuffer)); if (dep)
            removeRunDependency(dep); }, event => { if (onerror) {
            onerror();
        }
        else {
            throw 'Loading data file "' + url + '" failed.';
        } }); if (dep)
            addRunDependency(dep); }
        var FS = { root: null, mounts: [], devices: {}, streams: [], nextInode: 1, nameTable: null, currentPath: "/", initialized: false, ignorePermissions: true, ErrnoError: null, genericErrors: {}, filesystems: null, syncFSRequests: 0, lookupPath: (path, opts = {}) => { path = PATH_FS.resolve(path); if (!path)
                return { path: "", node: null }; var defaults = { follow_mount: true, recurse_count: 0 }; opts = Object.assign(defaults, opts); if (opts.recurse_count > 8) {
                throw new FS.ErrnoError(32);
            } var parts = path.split("/").filter(p => !!p); var current = FS.root; var current_path = "/"; for (var i = 0; i < parts.length; i++) {
                var islast = i === parts.length - 1;
                if (islast && opts.parent) {
                    break;
                }
                current = FS.lookupNode(current, parts[i]);
                current_path = PATH.join2(current_path, parts[i]);
                if (FS.isMountpoint(current)) {
                    if (!islast || islast && opts.follow_mount) {
                        current = current.mounted.root;
                    }
                }
                if (!islast || opts.follow) {
                    var count = 0;
                    while (FS.isLink(current.mode)) {
                        var link = FS.readlink(current_path);
                        current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
                        var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count + 1 });
                        current = lookup.node;
                        if (count++ > 40) {
                            throw new FS.ErrnoError(32);
                        }
                    }
                }
            } return { path: current_path, node: current }; }, getPath: node => { var path; while (true) {
                if (FS.isRoot(node)) {
                    var mount = node.mount.mountpoint;
                    if (!path)
                        return mount;
                    return mount[mount.length - 1] !== "/" ? mount + "/" + path : mount + path;
                }
                path = path ? node.name + "/" + path : node.name;
                node = node.parent;
            } }, hashName: (parentid, name) => { var hash = 0; for (var i = 0; i < name.length; i++) {
                hash = (hash << 5) - hash + name.charCodeAt(i) | 0;
            } return (parentid + hash >>> 0) % FS.nameTable.length; }, hashAddNode: node => { var hash = FS.hashName(node.parent.id, node.name); node.name_next = FS.nameTable[hash]; FS.nameTable[hash] = node; }, hashRemoveNode: node => { var hash = FS.hashName(node.parent.id, node.name); if (FS.nameTable[hash] === node) {
                FS.nameTable[hash] = node.name_next;
            }
            else {
                var current = FS.nameTable[hash];
                while (current) {
                    if (current.name_next === node) {
                        current.name_next = node.name_next;
                        break;
                    }
                    current = current.name_next;
                }
            } }, lookupNode: (parent, name) => { var errCode = FS.mayLookup(parent); if (errCode) {
                throw new FS.ErrnoError(errCode, parent);
            } var hash = FS.hashName(parent.id, name); for (var node = FS.nameTable[hash]; node; node = node.name_next) {
                var nodeName = node.name;
                if (node.parent.id === parent.id && nodeName === name) {
                    return node;
                }
            } return FS.lookup(parent, name); }, createNode: (parent, name, mode, rdev) => { var node = new FS.FSNode(parent, name, mode, rdev); FS.hashAddNode(node); return node; }, destroyNode: node => { FS.hashRemoveNode(node); }, isRoot: node => { return node === node.parent; }, isMountpoint: node => { return !!node.mounted; }, isFile: mode => { return (mode & 61440) === 32768; }, isDir: mode => { return (mode & 61440) === 16384; }, isLink: mode => { return (mode & 61440) === 40960; }, isChrdev: mode => { return (mode & 61440) === 8192; }, isBlkdev: mode => { return (mode & 61440) === 24576; }, isFIFO: mode => { return (mode & 61440) === 4096; }, isSocket: mode => { return (mode & 49152) === 49152; }, flagModes: { "r": 0, "r+": 2, "w": 577, "w+": 578, "a": 1089, "a+": 1090 }, modeStringToFlags: str => { var flags = FS.flagModes[str]; if (typeof flags == "undefined") {
                throw new Error("Unknown file open mode: " + str);
            } return flags; }, flagsToPermissionString: flag => { var perms = ["r", "w", "rw"][flag & 3]; if (flag & 512) {
                perms += "w";
            } return perms; }, nodePermissions: (node, perms) => { if (FS.ignorePermissions) {
                return 0;
            } if (perms.includes("r") && !(node.mode & 292)) {
                return 2;
            }
            else if (perms.includes("w") && !(node.mode & 146)) {
                return 2;
            }
            else if (perms.includes("x") && !(node.mode & 73)) {
                return 2;
            } return 0; }, mayLookup: dir => { var errCode = FS.nodePermissions(dir, "x"); if (errCode)
                return errCode; if (!dir.node_ops.lookup)
                return 2; return 0; }, mayCreate: (dir, name) => { try {
                var node = FS.lookupNode(dir, name);
                return 20;
            }
            catch (e) { } return FS.nodePermissions(dir, "wx"); }, mayDelete: (dir, name, isdir) => { var node; try {
                node = FS.lookupNode(dir, name);
            }
            catch (e) {
                return e.errno;
            } var errCode = FS.nodePermissions(dir, "wx"); if (errCode) {
                return errCode;
            } if (isdir) {
                if (!FS.isDir(node.mode)) {
                    return 54;
                }
                if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
                    return 10;
                }
            }
            else {
                if (FS.isDir(node.mode)) {
                    return 31;
                }
            } return 0; }, mayOpen: (node, flags) => { if (!node) {
                return 44;
            } if (FS.isLink(node.mode)) {
                return 32;
            }
            else if (FS.isDir(node.mode)) {
                if (FS.flagsToPermissionString(flags) !== "r" || flags & 512) {
                    return 31;
                }
            } return FS.nodePermissions(node, FS.flagsToPermissionString(flags)); }, MAX_OPEN_FDS: 4096, nextfd: (fd_start = 0, fd_end = FS.MAX_OPEN_FDS) => { for (var fd = fd_start; fd <= fd_end; fd++) {
                if (!FS.streams[fd]) {
                    return fd;
                }
            } throw new FS.ErrnoError(33); }, getStream: fd => FS.streams[fd], createStream: (stream, fd_start, fd_end) => { if (!FS.FSStream) {
                FS.FSStream = function () { this.shared = {}; };
                FS.FSStream.prototype = {};
                Object.defineProperties(FS.FSStream.prototype, { object: { get: function () { return this.node; }, set: function (val) { this.node = val; } }, isRead: { get: function () { return (this.flags & 2097155) !== 1; } }, isWrite: { get: function () { return (this.flags & 2097155) !== 0; } }, isAppend: { get: function () { return this.flags & 1024; } }, flags: { get: function () { return this.shared.flags; }, set: function (val) { this.shared.flags = val; } }, position: { get: function () { return this.shared.position; }, set: function (val) { this.shared.position = val; } } });
            } stream = Object.assign(new FS.FSStream, stream); var fd = FS.nextfd(fd_start, fd_end); stream.fd = fd; FS.streams[fd] = stream; return stream; }, closeStream: fd => { FS.streams[fd] = null; }, chrdev_stream_ops: { open: stream => { var device = FS.getDevice(stream.node.rdev); stream.stream_ops = device.stream_ops; if (stream.stream_ops.open) {
                    stream.stream_ops.open(stream);
                } }, llseek: () => { throw new FS.ErrnoError(70); } }, major: dev => dev >> 8, minor: dev => dev & 255, makedev: (ma, mi) => ma << 8 | mi, registerDevice: (dev, ops) => { FS.devices[dev] = { stream_ops: ops }; }, getDevice: dev => FS.devices[dev], getMounts: mount => { var mounts = []; var check = [mount]; while (check.length) {
                var m = check.pop();
                mounts.push(m);
                check.push.apply(check, m.mounts);
            } return mounts; }, syncfs: (populate, callback) => { if (typeof populate == "function") {
                callback = populate;
                populate = false;
            } FS.syncFSRequests++; if (FS.syncFSRequests > 1) {
                err("warning: " + FS.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work");
            } var mounts = FS.getMounts(FS.root.mount); var completed = 0; function doCallback(errCode) { FS.syncFSRequests--; return callback(errCode); } function done(errCode) { if (errCode) {
                if (!done.errored) {
                    done.errored = true;
                    return doCallback(errCode);
                }
                return;
            } if (++completed >= mounts.length) {
                doCallback(null);
            } } mounts.forEach(mount => { if (!mount.type.syncfs) {
                return done(null);
            } mount.type.syncfs(mount, populate, done); }); }, mount: (type, opts, mountpoint) => { var root = mountpoint === "/"; var pseudo = !mountpoint; var node; if (root && FS.root) {
                throw new FS.ErrnoError(10);
            }
            else if (!root && !pseudo) {
                var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
                mountpoint = lookup.path;
                node = lookup.node;
                if (FS.isMountpoint(node)) {
                    throw new FS.ErrnoError(10);
                }
                if (!FS.isDir(node.mode)) {
                    throw new FS.ErrnoError(54);
                }
            } var mount = { type: type, opts: opts, mountpoint: mountpoint, mounts: [] }; var mountRoot = type.mount(mount); mountRoot.mount = mount; mount.root = mountRoot; if (root) {
                FS.root = mountRoot;
            }
            else if (node) {
                node.mounted = mount;
                if (node.mount) {
                    node.mount.mounts.push(mount);
                }
            } return mountRoot; }, unmount: mountpoint => { var lookup = FS.lookupPath(mountpoint, { follow_mount: false }); if (!FS.isMountpoint(lookup.node)) {
                throw new FS.ErrnoError(28);
            } var node = lookup.node; var mount = node.mounted; var mounts = FS.getMounts(mount); Object.keys(FS.nameTable).forEach(hash => { var current = FS.nameTable[hash]; while (current) {
                var next = current.name_next;
                if (mounts.includes(current.mount)) {
                    FS.destroyNode(current);
                }
                current = next;
            } }); node.mounted = null; var idx = node.mount.mounts.indexOf(mount); node.mount.mounts.splice(idx, 1); }, lookup: (parent, name) => { return parent.node_ops.lookup(parent, name); }, mknod: (path, mode, dev) => { var lookup = FS.lookupPath(path, { parent: true }); var parent = lookup.node; var name = PATH.basename(path); if (!name || name === "." || name === "..") {
                throw new FS.ErrnoError(28);
            } var errCode = FS.mayCreate(parent, name); if (errCode) {
                throw new FS.ErrnoError(errCode);
            } if (!parent.node_ops.mknod) {
                throw new FS.ErrnoError(63);
            } return parent.node_ops.mknod(parent, name, mode, dev); }, create: (path, mode) => { mode = mode !== undefined ? mode : 438; mode &= 4095; mode |= 32768; return FS.mknod(path, mode, 0); }, mkdir: (path, mode) => { mode = mode !== undefined ? mode : 511; mode &= 511 | 512; mode |= 16384; return FS.mknod(path, mode, 0); }, mkdirTree: (path, mode) => { var dirs = path.split("/"); var d = ""; for (var i = 0; i < dirs.length; ++i) {
                if (!dirs[i])
                    continue;
                d += "/" + dirs[i];
                try {
                    FS.mkdir(d, mode);
                }
                catch (e) {
                    if (e.errno != 20)
                        throw e;
                }
            } }, mkdev: (path, mode, dev) => { if (typeof dev == "undefined") {
                dev = mode;
                mode = 438;
            } mode |= 8192; return FS.mknod(path, mode, dev); }, symlink: (oldpath, newpath) => { if (!PATH_FS.resolve(oldpath)) {
                throw new FS.ErrnoError(44);
            } var lookup = FS.lookupPath(newpath, { parent: true }); var parent = lookup.node; if (!parent) {
                throw new FS.ErrnoError(44);
            } var newname = PATH.basename(newpath); var errCode = FS.mayCreate(parent, newname); if (errCode) {
                throw new FS.ErrnoError(errCode);
            } if (!parent.node_ops.symlink) {
                throw new FS.ErrnoError(63);
            } return parent.node_ops.symlink(parent, newname, oldpath); }, rename: (old_path, new_path) => { var old_dirname = PATH.dirname(old_path); var new_dirname = PATH.dirname(new_path); var old_name = PATH.basename(old_path); var new_name = PATH.basename(new_path); var lookup, old_dir, new_dir; lookup = FS.lookupPath(old_path, { parent: true }); old_dir = lookup.node; lookup = FS.lookupPath(new_path, { parent: true }); new_dir = lookup.node; if (!old_dir || !new_dir)
                throw new FS.ErrnoError(44); if (old_dir.mount !== new_dir.mount) {
                throw new FS.ErrnoError(75);
            } var old_node = FS.lookupNode(old_dir, old_name); var relative = PATH_FS.relative(old_path, new_dirname); if (relative.charAt(0) !== ".") {
                throw new FS.ErrnoError(28);
            } relative = PATH_FS.relative(new_path, old_dirname); if (relative.charAt(0) !== ".") {
                throw new FS.ErrnoError(55);
            } var new_node; try {
                new_node = FS.lookupNode(new_dir, new_name);
            }
            catch (e) { } if (old_node === new_node) {
                return;
            } var isdir = FS.isDir(old_node.mode); var errCode = FS.mayDelete(old_dir, old_name, isdir); if (errCode) {
                throw new FS.ErrnoError(errCode);
            } errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name); if (errCode) {
                throw new FS.ErrnoError(errCode);
            } if (!old_dir.node_ops.rename) {
                throw new FS.ErrnoError(63);
            } if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
                throw new FS.ErrnoError(10);
            } if (new_dir !== old_dir) {
                errCode = FS.nodePermissions(old_dir, "w");
                if (errCode) {
                    throw new FS.ErrnoError(errCode);
                }
            } FS.hashRemoveNode(old_node); try {
                old_dir.node_ops.rename(old_node, new_dir, new_name);
            }
            catch (e) {
                throw e;
            }
            finally {
                FS.hashAddNode(old_node);
            } }, rmdir: path => { var lookup = FS.lookupPath(path, { parent: true }); var parent = lookup.node; var name = PATH.basename(path); var node = FS.lookupNode(parent, name); var errCode = FS.mayDelete(parent, name, true); if (errCode) {
                throw new FS.ErrnoError(errCode);
            } if (!parent.node_ops.rmdir) {
                throw new FS.ErrnoError(63);
            } if (FS.isMountpoint(node)) {
                throw new FS.ErrnoError(10);
            } parent.node_ops.rmdir(parent, name); FS.destroyNode(node); }, readdir: path => { var lookup = FS.lookupPath(path, { follow: true }); var node = lookup.node; if (!node.node_ops.readdir) {
                throw new FS.ErrnoError(54);
            } return node.node_ops.readdir(node); }, unlink: path => { var lookup = FS.lookupPath(path, { parent: true }); var parent = lookup.node; if (!parent) {
                throw new FS.ErrnoError(44);
            } var name = PATH.basename(path); var node = FS.lookupNode(parent, name); var errCode = FS.mayDelete(parent, name, false); if (errCode) {
                throw new FS.ErrnoError(errCode);
            } if (!parent.node_ops.unlink) {
                throw new FS.ErrnoError(63);
            } if (FS.isMountpoint(node)) {
                throw new FS.ErrnoError(10);
            } parent.node_ops.unlink(parent, name); FS.destroyNode(node); }, readlink: path => { var lookup = FS.lookupPath(path); var link = lookup.node; if (!link) {
                throw new FS.ErrnoError(44);
            } if (!link.node_ops.readlink) {
                throw new FS.ErrnoError(28);
            } return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link)); }, stat: (path, dontFollow) => { var lookup = FS.lookupPath(path, { follow: !dontFollow }); var node = lookup.node; if (!node) {
                throw new FS.ErrnoError(44);
            } if (!node.node_ops.getattr) {
                throw new FS.ErrnoError(63);
            } return node.node_ops.getattr(node); }, lstat: path => { return FS.stat(path, true); }, chmod: (path, mode, dontFollow) => { var node; if (typeof path == "string") {
                var lookup = FS.lookupPath(path, { follow: !dontFollow });
                node = lookup.node;
            }
            else {
                node = path;
            } if (!node.node_ops.setattr) {
                throw new FS.ErrnoError(63);
            } node.node_ops.setattr(node, { mode: mode & 4095 | node.mode & ~4095, timestamp: Date.now() }); }, lchmod: (path, mode) => { FS.chmod(path, mode, true); }, fchmod: (fd, mode) => { var stream = FS.getStream(fd); if (!stream) {
                throw new FS.ErrnoError(8);
            } FS.chmod(stream.node, mode); }, chown: (path, uid, gid, dontFollow) => { var node; if (typeof path == "string") {
                var lookup = FS.lookupPath(path, { follow: !dontFollow });
                node = lookup.node;
            }
            else {
                node = path;
            } if (!node.node_ops.setattr) {
                throw new FS.ErrnoError(63);
            } node.node_ops.setattr(node, { timestamp: Date.now() }); }, lchown: (path, uid, gid) => { FS.chown(path, uid, gid, true); }, fchown: (fd, uid, gid) => { var stream = FS.getStream(fd); if (!stream) {
                throw new FS.ErrnoError(8);
            } FS.chown(stream.node, uid, gid); }, truncate: (path, len) => { if (len < 0) {
                throw new FS.ErrnoError(28);
            } var node; if (typeof path == "string") {
                var lookup = FS.lookupPath(path, { follow: true });
                node = lookup.node;
            }
            else {
                node = path;
            } if (!node.node_ops.setattr) {
                throw new FS.ErrnoError(63);
            } if (FS.isDir(node.mode)) {
                throw new FS.ErrnoError(31);
            } if (!FS.isFile(node.mode)) {
                throw new FS.ErrnoError(28);
            } var errCode = FS.nodePermissions(node, "w"); if (errCode) {
                throw new FS.ErrnoError(errCode);
            } node.node_ops.setattr(node, { size: len, timestamp: Date.now() }); }, ftruncate: (fd, len) => { var stream = FS.getStream(fd); if (!stream) {
                throw new FS.ErrnoError(8);
            } if ((stream.flags & 2097155) === 0) {
                throw new FS.ErrnoError(28);
            } FS.truncate(stream.node, len); }, utime: (path, atime, mtime) => { var lookup = FS.lookupPath(path, { follow: true }); var node = lookup.node; node.node_ops.setattr(node, { timestamp: Math.max(atime, mtime) }); }, open: (path, flags, mode) => { if (path === "") {
                throw new FS.ErrnoError(44);
            } flags = typeof flags == "string" ? FS.modeStringToFlags(flags) : flags; mode = typeof mode == "undefined" ? 438 : mode; if (flags & 64) {
                mode = mode & 4095 | 32768;
            }
            else {
                mode = 0;
            } var node; if (typeof path == "object") {
                node = path;
            }
            else {
                path = PATH.normalize(path);
                try {
                    var lookup = FS.lookupPath(path, { follow: !(flags & 131072) });
                    node = lookup.node;
                }
                catch (e) { }
            } var created = false; if (flags & 64) {
                if (node) {
                    if (flags & 128) {
                        throw new FS.ErrnoError(20);
                    }
                }
                else {
                    node = FS.mknod(path, mode, 0);
                    created = true;
                }
            } if (!node) {
                throw new FS.ErrnoError(44);
            } if (FS.isChrdev(node.mode)) {
                flags &= ~512;
            } if (flags & 65536 && !FS.isDir(node.mode)) {
                throw new FS.ErrnoError(54);
            } if (!created) {
                var errCode = FS.mayOpen(node, flags);
                if (errCode) {
                    throw new FS.ErrnoError(errCode);
                }
            } if (flags & 512 && !created) {
                FS.truncate(node, 0);
            } flags &= ~(128 | 512 | 131072); var stream = FS.createStream({ node: node, path: FS.getPath(node), flags: flags, seekable: true, position: 0, stream_ops: node.stream_ops, ungotten: [], error: false }); if (stream.stream_ops.open) {
                stream.stream_ops.open(stream);
            } if (Module["logReadFiles"] && !(flags & 1)) {
                if (!FS.readFiles)
                    FS.readFiles = {};
                if (!(path in FS.readFiles)) {
                    FS.readFiles[path] = 1;
                }
            } return stream; }, close: stream => { if (FS.isClosed(stream)) {
                throw new FS.ErrnoError(8);
            } if (stream.getdents)
                stream.getdents = null; try {
                if (stream.stream_ops.close) {
                    stream.stream_ops.close(stream);
                }
            }
            catch (e) {
                throw e;
            }
            finally {
                FS.closeStream(stream.fd);
            } stream.fd = null; }, isClosed: stream => { return stream.fd === null; }, llseek: (stream, offset, whence) => { if (FS.isClosed(stream)) {
                throw new FS.ErrnoError(8);
            } if (!stream.seekable || !stream.stream_ops.llseek) {
                throw new FS.ErrnoError(70);
            } if (whence != 0 && whence != 1 && whence != 2) {
                throw new FS.ErrnoError(28);
            } stream.position = stream.stream_ops.llseek(stream, offset, whence); stream.ungotten = []; return stream.position; }, read: (stream, buffer, offset, length, position) => { if (length < 0 || position < 0) {
                throw new FS.ErrnoError(28);
            } if (FS.isClosed(stream)) {
                throw new FS.ErrnoError(8);
            } if ((stream.flags & 2097155) === 1) {
                throw new FS.ErrnoError(8);
            } if (FS.isDir(stream.node.mode)) {
                throw new FS.ErrnoError(31);
            } if (!stream.stream_ops.read) {
                throw new FS.ErrnoError(28);
            } var seeking = typeof position != "undefined"; if (!seeking) {
                position = stream.position;
            }
            else if (!stream.seekable) {
                throw new FS.ErrnoError(70);
            } var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position); if (!seeking)
                stream.position += bytesRead; return bytesRead; }, write: (stream, buffer, offset, length, position, canOwn) => { if (length < 0 || position < 0) {
                throw new FS.ErrnoError(28);
            } if (FS.isClosed(stream)) {
                throw new FS.ErrnoError(8);
            } if ((stream.flags & 2097155) === 0) {
                throw new FS.ErrnoError(8);
            } if (FS.isDir(stream.node.mode)) {
                throw new FS.ErrnoError(31);
            } if (!stream.stream_ops.write) {
                throw new FS.ErrnoError(28);
            } if (stream.seekable && stream.flags & 1024) {
                FS.llseek(stream, 0, 2);
            } var seeking = typeof position != "undefined"; if (!seeking) {
                position = stream.position;
            }
            else if (!stream.seekable) {
                throw new FS.ErrnoError(70);
            } var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn); if (!seeking)
                stream.position += bytesWritten; return bytesWritten; }, allocate: (stream, offset, length) => { if (FS.isClosed(stream)) {
                throw new FS.ErrnoError(8);
            } if (offset < 0 || length <= 0) {
                throw new FS.ErrnoError(28);
            } if ((stream.flags & 2097155) === 0) {
                throw new FS.ErrnoError(8);
            } if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
                throw new FS.ErrnoError(43);
            } if (!stream.stream_ops.allocate) {
                throw new FS.ErrnoError(138);
            } stream.stream_ops.allocate(stream, offset, length); }, mmap: (stream, length, position, prot, flags) => { if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
                throw new FS.ErrnoError(2);
            } if ((stream.flags & 2097155) === 1) {
                throw new FS.ErrnoError(2);
            } if (!stream.stream_ops.mmap) {
                throw new FS.ErrnoError(43);
            } return stream.stream_ops.mmap(stream, length, position, prot, flags); }, msync: (stream, buffer, offset, length, mmapFlags) => { if (!stream.stream_ops.msync) {
                return 0;
            } return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags); }, munmap: stream => 0, ioctl: (stream, cmd, arg) => { if (!stream.stream_ops.ioctl) {
                throw new FS.ErrnoError(59);
            } return stream.stream_ops.ioctl(stream, cmd, arg); }, readFile: (path, opts = {}) => { opts.flags = opts.flags || 0; opts.encoding = opts.encoding || "binary"; if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
                throw new Error('Invalid encoding type "' + opts.encoding + '"');
            } var ret; var stream = FS.open(path, opts.flags); var stat = FS.stat(path); var length = stat.size; var buf = new Uint8Array(length); FS.read(stream, buf, 0, length, 0); if (opts.encoding === "utf8") {
                ret = UTF8ArrayToString(buf, 0);
            }
            else if (opts.encoding === "binary") {
                ret = buf;
            } FS.close(stream); return ret; }, writeFile: (path, data, opts = {}) => { opts.flags = opts.flags || 577; var stream = FS.open(path, opts.flags, opts.mode); if (typeof data == "string") {
                var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
                var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
                FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
            }
            else if (ArrayBuffer.isView(data)) {
                FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
            }
            else {
                throw new Error("Unsupported data type");
            } FS.close(stream); }, cwd: () => FS.currentPath, chdir: path => { var lookup = FS.lookupPath(path, { follow: true }); if (lookup.node === null) {
                throw new FS.ErrnoError(44);
            } if (!FS.isDir(lookup.node.mode)) {
                throw new FS.ErrnoError(54);
            } var errCode = FS.nodePermissions(lookup.node, "x"); if (errCode) {
                throw new FS.ErrnoError(errCode);
            } FS.currentPath = lookup.path; }, createDefaultDirectories: () => { FS.mkdir("/tmp"); FS.mkdir("/home"); FS.mkdir("/home/web_user"); }, createDefaultDevices: () => { FS.mkdir("/dev"); FS.registerDevice(FS.makedev(1, 3), { read: () => 0, write: (stream, buffer, offset, length, pos) => length }); FS.mkdev("/dev/null", FS.makedev(1, 3)); TTY.register(FS.makedev(5, 0), TTY.default_tty_ops); TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops); FS.mkdev("/dev/tty", FS.makedev(5, 0)); FS.mkdev("/dev/tty1", FS.makedev(6, 0)); var randomBuffer = new Uint8Array(1024), randomLeft = 0; var randomByte = () => { if (randomLeft === 0) {
                randomLeft = randomFill(randomBuffer).byteLength;
            } return randomBuffer[--randomLeft]; }; FS.createDevice("/dev", "random", randomByte); FS.createDevice("/dev", "urandom", randomByte); FS.mkdir("/dev/shm"); FS.mkdir("/dev/shm/tmp"); }, createSpecialDirectories: () => { FS.mkdir("/proc"); var proc_self = FS.mkdir("/proc/self"); FS.mkdir("/proc/self/fd"); FS.mount({ mount: () => { var node = FS.createNode(proc_self, "fd", 16384 | 511, 73); node.node_ops = { lookup: (parent, name) => { var fd = +name; var stream = FS.getStream(fd); if (!stream)
                        throw new FS.ErrnoError(8); var ret = { parent: null, mount: { mountpoint: "fake" }, node_ops: { readlink: () => stream.path } }; ret.parent = ret; return ret; } }; return node; } }, {}, "/proc/self/fd"); }, createStandardStreams: () => { if (Module["stdin"]) {
                FS.createDevice("/dev", "stdin", Module["stdin"]);
            }
            else {
                FS.symlink("/dev/tty", "/dev/stdin");
            } if (Module["stdout"]) {
                FS.createDevice("/dev", "stdout", null, Module["stdout"]);
            }
            else {
                FS.symlink("/dev/tty", "/dev/stdout");
            } if (Module["stderr"]) {
                FS.createDevice("/dev", "stderr", null, Module["stderr"]);
            }
            else {
                FS.symlink("/dev/tty1", "/dev/stderr");
            } var stdin = FS.open("/dev/stdin", 0); var stdout = FS.open("/dev/stdout", 1); var stderr = FS.open("/dev/stderr", 1); }, ensureErrnoError: () => { if (FS.ErrnoError)
                return; FS.ErrnoError = function ErrnoError(errno, node) { this.name = "ErrnoError"; this.node = node; this.setErrno = function (errno) { this.errno = errno; }; this.setErrno(errno); this.message = "FS error"; }; FS.ErrnoError.prototype = new Error; FS.ErrnoError.prototype.constructor = FS.ErrnoError; [44].forEach(code => { FS.genericErrors[code] = new FS.ErrnoError(code); FS.genericErrors[code].stack = "<generic error, no stack>"; }); }, staticInit: () => { FS.ensureErrnoError(); FS.nameTable = new Array(4096); FS.mount(MEMFS, {}, "/"); FS.createDefaultDirectories(); FS.createDefaultDevices(); FS.createSpecialDirectories(); FS.filesystems = { "MEMFS": MEMFS }; }, init: (input, output, error) => { FS.init.initialized = true; FS.ensureErrnoError(); Module["stdin"] = input || Module["stdin"]; Module["stdout"] = output || Module["stdout"]; Module["stderr"] = error || Module["stderr"]; FS.createStandardStreams(); }, quit: () => { FS.init.initialized = false; for (var i = 0; i < FS.streams.length; i++) {
                var stream = FS.streams[i];
                if (!stream) {
                    continue;
                }
                FS.close(stream);
            } }, getMode: (canRead, canWrite) => { var mode = 0; if (canRead)
                mode |= 292 | 73; if (canWrite)
                mode |= 146; return mode; }, findObject: (path, dontResolveLastLink) => { var ret = FS.analyzePath(path, dontResolveLastLink); if (!ret.exists) {
                return null;
            } return ret.object; }, analyzePath: (path, dontResolveLastLink) => { try {
                var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
                path = lookup.path;
            }
            catch (e) { } var ret = { isRoot: false, exists: false, error: 0, name: null, path: null, object: null, parentExists: false, parentPath: null, parentObject: null }; try {
                var lookup = FS.lookupPath(path, { parent: true });
                ret.parentExists = true;
                ret.parentPath = lookup.path;
                ret.parentObject = lookup.node;
                ret.name = PATH.basename(path);
                lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
                ret.exists = true;
                ret.path = lookup.path;
                ret.object = lookup.node;
                ret.name = lookup.node.name;
                ret.isRoot = lookup.path === "/";
            }
            catch (e) {
                ret.error = e.errno;
            } return ret; }, createPath: (parent, path, canRead, canWrite) => { parent = typeof parent == "string" ? parent : FS.getPath(parent); var parts = path.split("/").reverse(); while (parts.length) {
                var part = parts.pop();
                if (!part)
                    continue;
                var current = PATH.join2(parent, part);
                try {
                    FS.mkdir(current);
                }
                catch (e) { }
                parent = current;
            } return current; }, createFile: (parent, name, properties, canRead, canWrite) => { var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name); var mode = FS.getMode(canRead, canWrite); return FS.create(path, mode); }, createDataFile: (parent, name, data, canRead, canWrite, canOwn) => { var path = name; if (parent) {
                parent = typeof parent == "string" ? parent : FS.getPath(parent);
                path = name ? PATH.join2(parent, name) : parent;
            } var mode = FS.getMode(canRead, canWrite); var node = FS.create(path, mode); if (data) {
                if (typeof data == "string") {
                    var arr = new Array(data.length);
                    for (var i = 0, len = data.length; i < len; ++i)
                        arr[i] = data.charCodeAt(i);
                    data = arr;
                }
                FS.chmod(node, mode | 146);
                var stream = FS.open(node, 577);
                FS.write(stream, data, 0, data.length, 0, canOwn);
                FS.close(stream);
                FS.chmod(node, mode);
            } return node; }, createDevice: (parent, name, input, output) => { var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name); var mode = FS.getMode(!!input, !!output); if (!FS.createDevice.major)
                FS.createDevice.major = 64; var dev = FS.makedev(FS.createDevice.major++, 0); FS.registerDevice(dev, { open: stream => { stream.seekable = false; }, close: stream => { if (output && output.buffer && output.buffer.length) {
                    output(10);
                } }, read: (stream, buffer, offset, length, pos) => { var bytesRead = 0; for (var i = 0; i < length; i++) {
                    var result;
                    try {
                        result = input();
                    }
                    catch (e) {
                        throw new FS.ErrnoError(29);
                    }
                    if (result === undefined && bytesRead === 0) {
                        throw new FS.ErrnoError(6);
                    }
                    if (result === null || result === undefined)
                        break;
                    bytesRead++;
                    buffer[offset + i] = result;
                } if (bytesRead) {
                    stream.node.timestamp = Date.now();
                } return bytesRead; }, write: (stream, buffer, offset, length, pos) => { for (var i = 0; i < length; i++) {
                    try {
                        output(buffer[offset + i]);
                    }
                    catch (e) {
                        throw new FS.ErrnoError(29);
                    }
                } if (length) {
                    stream.node.timestamp = Date.now();
                } return i; } }); return FS.mkdev(path, mode, dev); }, forceLoadFile: obj => { if (obj.isDevice || obj.isFolder || obj.link || obj.contents)
                return true; if (typeof XMLHttpRequest != "undefined") {
                throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
            }
            else if (read_) {
                try {
                    obj.contents = intArrayFromString(read_(obj.url), true);
                    obj.usedBytes = obj.contents.length;
                }
                catch (e) {
                    throw new FS.ErrnoError(29);
                }
            }
            else {
                throw new Error("Cannot load without read() or XMLHttpRequest.");
            } }, createLazyFile: (parent, name, url, canRead, canWrite) => { function LazyUint8Array() { this.lengthKnown = false; this.chunks = []; } LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) { if (idx > this.length - 1 || idx < 0) {
                return undefined;
            } var chunkOffset = idx % this.chunkSize; var chunkNum = idx / this.chunkSize | 0; return this.getter(chunkNum)[chunkOffset]; }; LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) { this.getter = getter; }; LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() { var xhr = new XMLHttpRequest; xhr.open("HEAD", url, false); xhr.send(null); if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304))
                throw new Error("Couldn't load " + url + ". Status: " + xhr.status); var datalength = Number(xhr.getResponseHeader("Content-length")); var header; var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes"; var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip"; var chunkSize = 1024 * 1024; if (!hasByteServing)
                chunkSize = datalength; var doXHR = (from, to) => { if (from > to)
                throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!"); if (to > datalength - 1)
                throw new Error("only " + datalength + " bytes available! programmer error!"); var xhr = new XMLHttpRequest; xhr.open("GET", url, false); if (datalength !== chunkSize)
                xhr.setRequestHeader("Range", "bytes=" + from + "-" + to); xhr.responseType = "arraybuffer"; if (xhr.overrideMimeType) {
                xhr.overrideMimeType("text/plain; charset=x-user-defined");
            } xhr.send(null); if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304))
                throw new Error("Couldn't load " + url + ". Status: " + xhr.status); if (xhr.response !== undefined) {
                return new Uint8Array(xhr.response || []);
            } return intArrayFromString(xhr.responseText || "", true); }; var lazyArray = this; lazyArray.setDataGetter(chunkNum => { var start = chunkNum * chunkSize; var end = (chunkNum + 1) * chunkSize - 1; end = Math.min(end, datalength - 1); if (typeof lazyArray.chunks[chunkNum] == "undefined") {
                lazyArray.chunks[chunkNum] = doXHR(start, end);
            } if (typeof lazyArray.chunks[chunkNum] == "undefined")
                throw new Error("doXHR failed!"); return lazyArray.chunks[chunkNum]; }); if (usesGzip || !datalength) {
                chunkSize = datalength = 1;
                datalength = this.getter(0).length;
                chunkSize = datalength;
                out("LazyFiles on gzip forces download of the whole file when length is accessed");
            } this._length = datalength; this._chunkSize = chunkSize; this.lengthKnown = true; }; if (typeof XMLHttpRequest != "undefined") {
                if (!ENVIRONMENT_IS_WORKER)
                    throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
                var lazyArray = new LazyUint8Array;
                Object.defineProperties(lazyArray, { length: { get: function () { if (!this.lengthKnown) {
                            this.cacheLength();
                        } return this._length; } }, chunkSize: { get: function () { if (!this.lengthKnown) {
                            this.cacheLength();
                        } return this._chunkSize; } } });
                var properties = { isDevice: false, contents: lazyArray };
            }
            else {
                var properties = { isDevice: false, url: url };
            } var node = FS.createFile(parent, name, properties, canRead, canWrite); if (properties.contents) {
                node.contents = properties.contents;
            }
            else if (properties.url) {
                node.contents = null;
                node.url = properties.url;
            } Object.defineProperties(node, { usedBytes: { get: function () { return this.contents.length; } } }); var stream_ops = {}; var keys = Object.keys(node.stream_ops); keys.forEach(key => { var fn = node.stream_ops[key]; stream_ops[key] = function forceLoadLazyFile() { FS.forceLoadFile(node); return fn.apply(null, arguments); }; }); function writeChunks(stream, buffer, offset, length, position) { var contents = stream.node.contents; if (position >= contents.length)
                return 0; var size = Math.min(contents.length - position, length); if (contents.slice) {
                for (var i = 0; i < size; i++) {
                    buffer[offset + i] = contents[position + i];
                }
            }
            else {
                for (var i = 0; i < size; i++) {
                    buffer[offset + i] = contents.get(position + i);
                }
            } return size; } stream_ops.read = (stream, buffer, offset, length, position) => { FS.forceLoadFile(node); return writeChunks(stream, buffer, offset, length, position); }; stream_ops.mmap = (stream, length, position, prot, flags) => { FS.forceLoadFile(node); var ptr = mmapAlloc(length); if (!ptr) {
                throw new FS.ErrnoError(48);
            } writeChunks(stream, HEAP8, ptr, length, position); return { ptr: ptr, allocated: true }; }; node.stream_ops = stream_ops; return node; }, createPreloadedFile: (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => { var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent; var dep = getUniqueRunDependency("cp " + fullname); function processData(byteArray) { function finish(byteArray) { if (preFinish)
                preFinish(); if (!dontCreateFile) {
                FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
            } if (onload)
                onload(); removeRunDependency(dep); } if (Browser.handledByPreloadPlugin(byteArray, fullname, finish, () => { if (onerror)
                onerror(); removeRunDependency(dep); })) {
                return;
            } finish(byteArray); } addRunDependency(dep); if (typeof url == "string") {
                asyncLoad(url, byteArray => processData(byteArray), onerror);
            }
            else {
                processData(url);
            } } };
        var SYSCALLS = { DEFAULT_POLLMASK: 5, calculateAt: function (dirfd, path, allowEmpty) { if (PATH.isAbs(path)) {
                return path;
            } var dir; if (dirfd === -100) {
                dir = FS.cwd();
            }
            else {
                var dirstream = SYSCALLS.getStreamFromFD(dirfd);
                dir = dirstream.path;
            } if (path.length == 0) {
                if (!allowEmpty) {
                    throw new FS.ErrnoError(44);
                }
                return dir;
            } return PATH.join2(dir, path); }, doStat: function (func, path, buf) { try {
                var stat = func(path);
            }
            catch (e) {
                if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
                    return -54;
                }
                throw e;
            } HEAP32[buf >> 2] = stat.dev; HEAP32[buf + 8 >> 2] = stat.ino; HEAP32[buf + 12 >> 2] = stat.mode; HEAPU32[buf + 16 >> 2] = stat.nlink; HEAP32[buf + 20 >> 2] = stat.uid; HEAP32[buf + 24 >> 2] = stat.gid; HEAP32[buf + 28 >> 2] = stat.rdev; tempI64 = [stat.size >>> 0, (tempDouble = stat.size, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 40 >> 2] = tempI64[0], HEAP32[buf + 44 >> 2] = tempI64[1]; HEAP32[buf + 48 >> 2] = 4096; HEAP32[buf + 52 >> 2] = stat.blocks; var atime = stat.atime.getTime(); var mtime = stat.mtime.getTime(); var ctime = stat.ctime.getTime(); tempI64 = [Math.floor(atime / 1e3) >>> 0, (tempDouble = Math.floor(atime / 1e3), +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 56 >> 2] = tempI64[0], HEAP32[buf + 60 >> 2] = tempI64[1]; HEAPU32[buf + 64 >> 2] = atime % 1e3 * 1e3; tempI64 = [Math.floor(mtime / 1e3) >>> 0, (tempDouble = Math.floor(mtime / 1e3), +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 72 >> 2] = tempI64[0], HEAP32[buf + 76 >> 2] = tempI64[1]; HEAPU32[buf + 80 >> 2] = mtime % 1e3 * 1e3; tempI64 = [Math.floor(ctime / 1e3) >>> 0, (tempDouble = Math.floor(ctime / 1e3), +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 88 >> 2] = tempI64[0], HEAP32[buf + 92 >> 2] = tempI64[1]; HEAPU32[buf + 96 >> 2] = ctime % 1e3 * 1e3; tempI64 = [stat.ino >>> 0, (tempDouble = stat.ino, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 104 >> 2] = tempI64[0], HEAP32[buf + 108 >> 2] = tempI64[1]; return 0; }, doMsync: function (addr, stream, len, flags, offset) { if (!FS.isFile(stream.node.mode)) {
                throw new FS.ErrnoError(43);
            } if (flags & 2) {
                return 0;
            } var buffer = HEAPU8.slice(addr, addr + len); FS.msync(stream, buffer, offset, len, flags); }, varargs: undefined, get: function () { SYSCALLS.varargs += 4; var ret = HEAP32[SYSCALLS.varargs - 4 >> 2]; return ret; }, getStr: function (ptr) { var ret = UTF8ToString(ptr); return ret; }, getStreamFromFD: function (fd) { var stream = FS.getStream(fd); if (!stream)
                throw new FS.ErrnoError(8); return stream; } };
        function ___syscall_fcntl64(fd, cmd, varargs) { SYSCALLS.varargs = varargs; try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            switch (cmd) {
                case 0: {
                    var arg = SYSCALLS.get();
                    if (arg < 0) {
                        return -28;
                    }
                    var newStream;
                    newStream = FS.createStream(stream, arg);
                    return newStream.fd;
                }
                case 1:
                case 2: return 0;
                case 3: return stream.flags;
                case 4: {
                    var arg = SYSCALLS.get();
                    stream.flags |= arg;
                    return 0;
                }
                case 5: {
                    var arg = SYSCALLS.get();
                    var offset = 0;
                    HEAP16[arg + offset >> 1] = 2;
                    return 0;
                }
                case 6:
                case 7: return 0;
                case 16:
                case 8: return -28;
                case 9:
                    setErrNo(28);
                    return -1;
                default: {
                    return -28;
                }
            }
        }
        catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
                throw e;
            return -e.errno;
        } }
        function ___syscall_ioctl(fd, op, varargs) { SYSCALLS.varargs = varargs; try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            switch (op) {
                case 21509:
                case 21505: {
                    if (!stream.tty)
                        return -59;
                    return 0;
                }
                case 21510:
                case 21511:
                case 21512:
                case 21506:
                case 21507:
                case 21508: {
                    if (!stream.tty)
                        return -59;
                    return 0;
                }
                case 21519: {
                    if (!stream.tty)
                        return -59;
                    var argp = SYSCALLS.get();
                    HEAP32[argp >> 2] = 0;
                    return 0;
                }
                case 21520: {
                    if (!stream.tty)
                        return -59;
                    return -28;
                }
                case 21531: {
                    var argp = SYSCALLS.get();
                    return FS.ioctl(stream, op, argp);
                }
                case 21523: {
                    if (!stream.tty)
                        return -59;
                    return 0;
                }
                case 21524: {
                    if (!stream.tty)
                        return -59;
                    return 0;
                }
                default: return -28;
            }
        }
        catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
                throw e;
            return -e.errno;
        } }
        function ___syscall_openat(dirfd, path, flags, varargs) { SYSCALLS.varargs = varargs; try {
            path = SYSCALLS.getStr(path);
            path = SYSCALLS.calculateAt(dirfd, path);
            var mode = varargs ? SYSCALLS.get() : 0;
            return FS.open(path, flags, mode).fd;
        }
        catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
                throw e;
            return -e.errno;
        } }
        function ___syscall_stat64(path, buf) { try {
            path = SYSCALLS.getStr(path);
            return SYSCALLS.doStat(FS.stat, path, buf);
        }
        catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
                throw e;
            return -e.errno;
        } }
        function readI53FromI64(ptr) { return HEAPU32[ptr >> 2] + HEAP32[ptr + 4 >> 2] * 4294967296; }
        function __gmtime_js(time, tmPtr) { var date = new Date(readI53FromI64(time) * 1e3); HEAP32[tmPtr >> 2] = date.getUTCSeconds(); HEAP32[tmPtr + 4 >> 2] = date.getUTCMinutes(); HEAP32[tmPtr + 8 >> 2] = date.getUTCHours(); HEAP32[tmPtr + 12 >> 2] = date.getUTCDate(); HEAP32[tmPtr + 16 >> 2] = date.getUTCMonth(); HEAP32[tmPtr + 20 >> 2] = date.getUTCFullYear() - 1900; HEAP32[tmPtr + 24 >> 2] = date.getUTCDay(); var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0); var yday = (date.getTime() - start) / (1e3 * 60 * 60 * 24) | 0; HEAP32[tmPtr + 28 >> 2] = yday; }
        function isLeapYear(year) { return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0); }
        var MONTH_DAYS_LEAP_CUMULATIVE = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
        var MONTH_DAYS_REGULAR_CUMULATIVE = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        function ydayFromDate(date) { var leap = isLeapYear(date.getFullYear()); var monthDaysCumulative = leap ? MONTH_DAYS_LEAP_CUMULATIVE : MONTH_DAYS_REGULAR_CUMULATIVE; var yday = monthDaysCumulative[date.getMonth()] + date.getDate() - 1; return yday; }
        function __localtime_js(time, tmPtr) { var date = new Date(readI53FromI64(time) * 1e3); HEAP32[tmPtr >> 2] = date.getSeconds(); HEAP32[tmPtr + 4 >> 2] = date.getMinutes(); HEAP32[tmPtr + 8 >> 2] = date.getHours(); HEAP32[tmPtr + 12 >> 2] = date.getDate(); HEAP32[tmPtr + 16 >> 2] = date.getMonth(); HEAP32[tmPtr + 20 >> 2] = date.getFullYear() - 1900; HEAP32[tmPtr + 24 >> 2] = date.getDay(); var yday = ydayFromDate(date) | 0; HEAP32[tmPtr + 28 >> 2] = yday; HEAP32[tmPtr + 36 >> 2] = -(date.getTimezoneOffset() * 60); var start = new Date(date.getFullYear(), 0, 1); var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset(); var winterOffset = start.getTimezoneOffset(); var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0; HEAP32[tmPtr + 32 >> 2] = dst; }
        function __mmap_js(len, prot, flags, fd, off, allocated, addr) { try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            var res = FS.mmap(stream, len, off, prot, flags);
            var ptr = res.ptr;
            HEAP32[allocated >> 2] = res.allocated;
            HEAPU32[addr >> 2] = ptr;
            return 0;
        }
        catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
                throw e;
            return -e.errno;
        } }
        function __munmap_js(addr, len, prot, flags, fd, offset) { try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            if (prot & 2) {
                SYSCALLS.doMsync(addr, stream, len, flags, offset);
            }
            FS.munmap(stream);
        }
        catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
                throw e;
            return -e.errno;
        } }
        function stringToUTF8(str, outPtr, maxBytesToWrite) { return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite); }
        function stringToNewUTF8(str) { var size = lengthBytesUTF8(str) + 1; var ret = _malloc(size); if (ret)
            stringToUTF8(str, ret, size); return ret; }
        function __tzset_js(timezone, daylight, tzname) { var currentYear = (new Date).getFullYear(); var winter = new Date(currentYear, 0, 1); var summer = new Date(currentYear, 6, 1); var winterOffset = winter.getTimezoneOffset(); var summerOffset = summer.getTimezoneOffset(); var stdTimezoneOffset = Math.max(winterOffset, summerOffset); HEAPU32[timezone >> 2] = stdTimezoneOffset * 60; HEAP32[daylight >> 2] = Number(winterOffset != summerOffset); function extractZone(date) { var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/); return match ? match[1] : "GMT"; } var winterName = extractZone(winter); var summerName = extractZone(summer); var winterNamePtr = stringToNewUTF8(winterName); var summerNamePtr = stringToNewUTF8(summerName); if (summerOffset < winterOffset) {
            HEAPU32[tzname >> 2] = winterNamePtr;
            HEAPU32[tzname + 4 >> 2] = summerNamePtr;
        }
        else {
            HEAPU32[tzname >> 2] = summerNamePtr;
            HEAPU32[tzname + 4 >> 2] = winterNamePtr;
        } }
        function _emscripten_date_now() { return Date.now(); }
        function _emscripten_memcpy_big(dest, src, num) { HEAPU8.copyWithin(dest, src, src + num); }
        function abortOnCannotGrowMemory(requestedSize) { abort("OOM"); }
        function _emscripten_resize_heap(requestedSize) { var oldSize = HEAPU8.length; requestedSize = requestedSize >>> 0; abortOnCannotGrowMemory(requestedSize); }
        var ENV = {};
        function getExecutableName() { return thisProgram || "./this.program"; }
        function getEnvStrings() { if (!getEnvStrings.strings) {
            var lang = (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8";
            var env = { "USER": "web_user", "LOGNAME": "web_user", "PATH": "/", "PWD": "/", "HOME": "/home/web_user", "LANG": lang, "_": getExecutableName() };
            for (var x in ENV) {
                if (ENV[x] === undefined)
                    delete env[x];
                else
                    env[x] = ENV[x];
            }
            var strings = [];
            for (var x in env) {
                strings.push(x + "=" + env[x]);
            }
            getEnvStrings.strings = strings;
        } return getEnvStrings.strings; }
        function stringToAscii(str, buffer) { for (var i = 0; i < str.length; ++i) {
            HEAP8[buffer++ >> 0] = str.charCodeAt(i);
        } HEAP8[buffer >> 0] = 0; }
        function _environ_get(__environ, environ_buf) { var bufSize = 0; getEnvStrings().forEach(function (string, i) { var ptr = environ_buf + bufSize; HEAPU32[__environ + i * 4 >> 2] = ptr; stringToAscii(string, ptr); bufSize += string.length + 1; }); return 0; }
        function _environ_sizes_get(penviron_count, penviron_buf_size) { var strings = getEnvStrings(); HEAPU32[penviron_count >> 2] = strings.length; var bufSize = 0; strings.forEach(function (string) { bufSize += string.length + 1; }); HEAPU32[penviron_buf_size >> 2] = bufSize; return 0; }
        function _proc_exit(code) { EXITSTATUS = code; if (!keepRuntimeAlive()) {
            if (Module["onExit"])
                Module["onExit"](code);
            ABORT = true;
        } quit_(code, new ExitStatus(code)); }
        function exitJS(status, implicit) { EXITSTATUS = status; _proc_exit(status); }
        var _exit = exitJS;
        function _fd_close(fd) { try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            FS.close(stream);
            return 0;
        }
        catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
                throw e;
            return e.errno;
        } }
        function doReadv(stream, iov, iovcnt, offset) { var ret = 0; for (var i = 0; i < iovcnt; i++) {
            var ptr = HEAPU32[iov >> 2];
            var len = HEAPU32[iov + 4 >> 2];
            iov += 8;
            var curr = FS.read(stream, HEAP8, ptr, len, offset);
            if (curr < 0)
                return -1;
            ret += curr;
            if (curr < len)
                break;
            if (typeof offset !== "undefined") {
                offset += curr;
            }
        } return ret; }
        function _fd_read(fd, iov, iovcnt, pnum) { try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            var num = doReadv(stream, iov, iovcnt);
            HEAPU32[pnum >> 2] = num;
            return 0;
        }
        catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
                throw e;
            return e.errno;
        } }
        function convertI32PairToI53Checked(lo, hi) { return hi + 2097152 >>> 0 < 4194305 - !!lo ? (lo >>> 0) + hi * 4294967296 : NaN; }
        function _fd_seek(fd, offset_low, offset_high, whence, newOffset) { try {
            var offset = convertI32PairToI53Checked(offset_low, offset_high);
            if (isNaN(offset))
                return 61;
            var stream = SYSCALLS.getStreamFromFD(fd);
            FS.llseek(stream, offset, whence);
            tempI64 = [stream.position >>> 0, (tempDouble = stream.position, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[newOffset >> 2] = tempI64[0], HEAP32[newOffset + 4 >> 2] = tempI64[1];
            if (stream.getdents && offset === 0 && whence === 0)
                stream.getdents = null;
            return 0;
        }
        catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
                throw e;
            return e.errno;
        } }
        function doWritev(stream, iov, iovcnt, offset) { var ret = 0; for (var i = 0; i < iovcnt; i++) {
            var ptr = HEAPU32[iov >> 2];
            var len = HEAPU32[iov + 4 >> 2];
            iov += 8;
            var curr = FS.write(stream, HEAP8, ptr, len, offset);
            if (curr < 0)
                return -1;
            ret += curr;
            if (typeof offset !== "undefined") {
                offset += curr;
            }
        } return ret; }
        function _fd_write(fd, iov, iovcnt, pnum) { try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            var num = doWritev(stream, iov, iovcnt);
            HEAPU32[pnum >> 2] = num;
            return 0;
        }
        catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
                throw e;
            return e.errno;
        } }
        function arraySum(array, index) { var sum = 0; for (var i = 0; i <= index; sum += array[i++]) { } return sum; }
        var MONTH_DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var MONTH_DAYS_REGULAR = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        function addDays(date, days) { var newDate = new Date(date.getTime()); while (days > 0) {
            var leap = isLeapYear(newDate.getFullYear());
            var currentMonth = newDate.getMonth();
            var daysInCurrentMonth = (leap ? MONTH_DAYS_LEAP : MONTH_DAYS_REGULAR)[currentMonth];
            if (days > daysInCurrentMonth - newDate.getDate()) {
                days -= daysInCurrentMonth - newDate.getDate() + 1;
                newDate.setDate(1);
                if (currentMonth < 11) {
                    newDate.setMonth(currentMonth + 1);
                }
                else {
                    newDate.setMonth(0);
                    newDate.setFullYear(newDate.getFullYear() + 1);
                }
            }
            else {
                newDate.setDate(newDate.getDate() + days);
                return newDate;
            }
        } return newDate; }
        function writeArrayToMemory(array, buffer) { HEAP8.set(array, buffer); }
        function _strftime(s, maxsize, format, tm) { var tm_zone = HEAP32[tm + 40 >> 2]; var date = { tm_sec: HEAP32[tm >> 2], tm_min: HEAP32[tm + 4 >> 2], tm_hour: HEAP32[tm + 8 >> 2], tm_mday: HEAP32[tm + 12 >> 2], tm_mon: HEAP32[tm + 16 >> 2], tm_year: HEAP32[tm + 20 >> 2], tm_wday: HEAP32[tm + 24 >> 2], tm_yday: HEAP32[tm + 28 >> 2], tm_isdst: HEAP32[tm + 32 >> 2], tm_gmtoff: HEAP32[tm + 36 >> 2], tm_zone: tm_zone ? UTF8ToString(tm_zone) : "" }; var pattern = UTF8ToString(format); var EXPANSION_RULES_1 = { "%c": "%a %b %d %H:%M:%S %Y", "%D": "%m/%d/%y", "%F": "%Y-%m-%d", "%h": "%b", "%r": "%I:%M:%S %p", "%R": "%H:%M", "%T": "%H:%M:%S", "%x": "%m/%d/%y", "%X": "%H:%M:%S", "%Ec": "%c", "%EC": "%C", "%Ex": "%m/%d/%y", "%EX": "%H:%M:%S", "%Ey": "%y", "%EY": "%Y", "%Od": "%d", "%Oe": "%e", "%OH": "%H", "%OI": "%I", "%Om": "%m", "%OM": "%M", "%OS": "%S", "%Ou": "%u", "%OU": "%U", "%OV": "%V", "%Ow": "%w", "%OW": "%W", "%Oy": "%y" }; for (var rule in EXPANSION_RULES_1) {
            pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_1[rule]);
        } var WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; function leadingSomething(value, digits, character) { var str = typeof value == "number" ? value.toString() : value || ""; while (str.length < digits) {
            str = character[0] + str;
        } return str; } function leadingNulls(value, digits) { return leadingSomething(value, digits, "0"); } function compareByDay(date1, date2) { function sgn(value) { return value < 0 ? -1 : value > 0 ? 1 : 0; } var compare; if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
            if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
                compare = sgn(date1.getDate() - date2.getDate());
            }
        } return compare; } function getFirstWeekStartDate(janFourth) { switch (janFourth.getDay()) {
            case 0: return new Date(janFourth.getFullYear() - 1, 11, 29);
            case 1: return janFourth;
            case 2: return new Date(janFourth.getFullYear(), 0, 3);
            case 3: return new Date(janFourth.getFullYear(), 0, 2);
            case 4: return new Date(janFourth.getFullYear(), 0, 1);
            case 5: return new Date(janFourth.getFullYear() - 1, 11, 31);
            case 6: return new Date(janFourth.getFullYear() - 1, 11, 30);
        } } function getWeekBasedYear(date) { var thisDate = addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday); var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4); var janFourthNextYear = new Date(thisDate.getFullYear() + 1, 0, 4); var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear); var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear); if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
            if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
                return thisDate.getFullYear() + 1;
            }
            return thisDate.getFullYear();
        } return thisDate.getFullYear() - 1; } var EXPANSION_RULES_2 = { "%a": function (date) { return WEEKDAYS[date.tm_wday].substring(0, 3); }, "%A": function (date) { return WEEKDAYS[date.tm_wday]; }, "%b": function (date) { return MONTHS[date.tm_mon].substring(0, 3); }, "%B": function (date) { return MONTHS[date.tm_mon]; }, "%C": function (date) { var year = date.tm_year + 1900; return leadingNulls(year / 100 | 0, 2); }, "%d": function (date) { return leadingNulls(date.tm_mday, 2); }, "%e": function (date) { return leadingSomething(date.tm_mday, 2, " "); }, "%g": function (date) { return getWeekBasedYear(date).toString().substring(2); }, "%G": function (date) { return getWeekBasedYear(date); }, "%H": function (date) { return leadingNulls(date.tm_hour, 2); }, "%I": function (date) { var twelveHour = date.tm_hour; if (twelveHour == 0)
                twelveHour = 12;
            else if (twelveHour > 12)
                twelveHour -= 12; return leadingNulls(twelveHour, 2); }, "%j": function (date) { return leadingNulls(date.tm_mday + arraySum(isLeapYear(date.tm_year + 1900) ? MONTH_DAYS_LEAP : MONTH_DAYS_REGULAR, date.tm_mon - 1), 3); }, "%m": function (date) { return leadingNulls(date.tm_mon + 1, 2); }, "%M": function (date) { return leadingNulls(date.tm_min, 2); }, "%n": function () { return "\n"; }, "%p": function (date) { if (date.tm_hour >= 0 && date.tm_hour < 12) {
                return "AM";
            } return "PM"; }, "%S": function (date) { return leadingNulls(date.tm_sec, 2); }, "%t": function () { return "\t"; }, "%u": function (date) { return date.tm_wday || 7; }, "%U": function (date) { var days = date.tm_yday + 7 - date.tm_wday; return leadingNulls(Math.floor(days / 7), 2); }, "%V": function (date) { var val = Math.floor((date.tm_yday + 7 - (date.tm_wday + 6) % 7) / 7); if ((date.tm_wday + 371 - date.tm_yday - 2) % 7 <= 2) {
                val++;
            } if (!val) {
                val = 52;
                var dec31 = (date.tm_wday + 7 - date.tm_yday - 1) % 7;
                if (dec31 == 4 || dec31 == 5 && isLeapYear(date.tm_year % 400 - 1)) {
                    val++;
                }
            }
            else if (val == 53) {
                var jan1 = (date.tm_wday + 371 - date.tm_yday) % 7;
                if (jan1 != 4 && (jan1 != 3 || !isLeapYear(date.tm_year)))
                    val = 1;
            } return leadingNulls(val, 2); }, "%w": function (date) { return date.tm_wday; }, "%W": function (date) { var days = date.tm_yday + 7 - (date.tm_wday + 6) % 7; return leadingNulls(Math.floor(days / 7), 2); }, "%y": function (date) { return (date.tm_year + 1900).toString().substring(2); }, "%Y": function (date) { return date.tm_year + 1900; }, "%z": function (date) { var off = date.tm_gmtoff; var ahead = off >= 0; off = Math.abs(off) / 60; off = off / 60 * 100 + off % 60; return (ahead ? "+" : "-") + String("0000" + off).slice(-4); }, "%Z": function (date) { return date.tm_zone; }, "%%": function () { return "%"; } }; pattern = pattern.replace(/%%/g, "\0\0"); for (var rule in EXPANSION_RULES_2) {
            if (pattern.includes(rule)) {
                pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_2[rule](date));
            }
        } pattern = pattern.replace(/\0\0/g, "%"); var bytes = intArrayFromString(pattern, false); if (bytes.length > maxsize) {
            return 0;
        } writeArrayToMemory(bytes, s); return bytes.length - 1; }
        function handleException(e) { if (e instanceof ExitStatus || e == "unwind") {
            return EXITSTATUS;
        } quit_(1, e); }
        function stringToUTF8OnStack(str) { var size = lengthBytesUTF8(str) + 1; var ret = stackAlloc(size); stringToUTF8(str, ret, size); return ret; }
        var FSNode = function (parent, name, mode, rdev) { if (!parent) {
            parent = this;
        } this.parent = parent; this.mount = parent.mount; this.mounted = null; this.id = FS.nextInode++; this.name = name; this.mode = mode; this.node_ops = {}; this.stream_ops = {}; this.rdev = rdev; };
        var readMode = 292 | 73;
        var writeMode = 146;
        Object.defineProperties(FSNode.prototype, { read: { get: function () { return (this.mode & readMode) === readMode; }, set: function (val) { val ? this.mode |= readMode : this.mode &= ~readMode; } }, write: { get: function () { return (this.mode & writeMode) === writeMode; }, set: function (val) { val ? this.mode |= writeMode : this.mode &= ~writeMode; } }, isFolder: { get: function () { return FS.isDir(this.mode); } }, isDevice: { get: function () { return FS.isChrdev(this.mode); } } });
        FS.FSNode = FSNode;
        FS.staticInit();
        var wasmImports = { "a": ___assert_fail, "g": ___syscall_fcntl64, "k": ___syscall_ioctl, "h": ___syscall_openat, "o": ___syscall_stat64, "r": __gmtime_js, "s": __localtime_js, "p": __mmap_js, "q": __munmap_js, "n": __tzset_js, "i": _emscripten_date_now, "j": _emscripten_memcpy_big, "m": _emscripten_resize_heap, "t": _environ_get, "u": _environ_sizes_get, "b": _exit, "d": _fd_close, "f": _fd_read, "l": _fd_seek, "e": _fd_write, "c": _strftime };
        var asm = createWasm();
        var ___wasm_call_ctors = function () { return (___wasm_call_ctors = Module["asm"]["w"]).apply(null, arguments); };
        var _malloc = function () { return (_malloc = Module["asm"]["x"]).apply(null, arguments); };
        var ___errno_location = function () { return (___errno_location = Module["asm"]["y"]).apply(null, arguments); };
        var _main = Module["_main"] = function () { return (_main = Module["_main"] = Module["asm"]["A"]).apply(null, arguments); };
        var _emscripten_builtin_memalign = function () { return (_emscripten_builtin_memalign = Module["asm"]["B"]).apply(null, arguments); };
        var stackAlloc = function () { return (stackAlloc = Module["asm"]["C"]).apply(null, arguments); };
        Module["FS"] = FS;
        var calledRun;
        dependenciesFulfilled = function runCaller() { if (!calledRun)
            run(); if (!calledRun)
            dependenciesFulfilled = runCaller; };
        function callMain(args = []) { var entryFunction = _main; args.unshift(thisProgram); var argc = args.length; var argv = stackAlloc((argc + 1) * 4); var argv_ptr = argv >> 2; args.forEach(arg => { HEAP32[argv_ptr++] = stringToUTF8OnStack(arg); }); HEAP32[argv_ptr] = 0; try {
            var ret = entryFunction(argc, argv);
            exitJS(ret, true);
            return ret;
        }
        catch (e) {
            return handleException(e);
        } }
        function run(args = arguments_) { if (runDependencies > 0) {
            return;
        } preRun(); if (runDependencies > 0) {
            return;
        } function doRun() { if (calledRun)
            return; calledRun = true; Module["calledRun"] = true; if (ABORT)
            return; initRuntime(); preMain(); readyPromiseResolve(Module); if (Module["onRuntimeInitialized"])
            Module["onRuntimeInitialized"](); if (shouldRunNow)
            callMain(args); postRun(); } if (Module["setStatus"]) {
            Module["setStatus"]("Running...");
            setTimeout(function () { setTimeout(function () { Module["setStatus"](""); }, 1); doRun(); }, 1);
        }
        else {
            doRun();
        } }
        if (Module["preInit"]) {
            if (typeof Module["preInit"] == "function")
                Module["preInit"] = [Module["preInit"]];
            while (Module["preInit"].length > 0) {
                Module["preInit"].pop()();
            }
        }
        var shouldRunNow = true;
        if (Module["noInitialRun"])
            shouldRunNow = false;
        run();
        return createRgbAsm.ready;
    });
})();
exports["default"] = createRgbAsm;


/***/ }),

/***/ 18569:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var createRgbFix = (() => {
    var _scriptDir = "file:///D:/Emulators/New%20folder/gb-studio-develop/gb-studio-develop/appData/wasm/rgbds/rgbfix.js";
    return (function (createRgbFix = {}) {
        var Module = typeof createRgbFix != "undefined" ? createRgbFix : {};
        var readyPromiseResolve, readyPromiseReject;
        Module["ready"] = new Promise((resolve, reject) => { readyPromiseResolve = resolve; readyPromiseReject = reject; });
        var moduleOverrides = Object.assign({}, Module);
        var arguments_ = [];
        var thisProgram = "./this.program";
        var quit_ = (status, toThrow) => { throw toThrow; };
        var ENVIRONMENT_IS_WEB = true;
        var ENVIRONMENT_IS_WORKER = false;
        var scriptDirectory = "";
        function locateFile(path) { if (Module["locateFile"]) {
            return Module["locateFile"](path, scriptDirectory);
        } return scriptDirectory + path; }
        var read_, readAsync, readBinary, setWindowTitle;
        if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
            if (ENVIRONMENT_IS_WORKER) {
                scriptDirectory = self.location.href;
            }
            else if (typeof document != "undefined" && document.currentScript) {
                scriptDirectory = document.currentScript.src;
            }
            if (_scriptDir) {
                scriptDirectory = _scriptDir;
            }
            if (scriptDirectory.indexOf("blob:") !== 0) {
                scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1);
            }
            else {
                scriptDirectory = "";
            }
            {
                read_ = url => { var xhr = new XMLHttpRequest; xhr.open("GET", url, false); xhr.send(null); return xhr.responseText; };
                if (ENVIRONMENT_IS_WORKER) {
                    readBinary = url => { var xhr = new XMLHttpRequest; xhr.open("GET", url, false); xhr.responseType = "arraybuffer"; xhr.send(null); return new Uint8Array(xhr.response); };
                }
                readAsync = (url, onload, onerror) => { var xhr = new XMLHttpRequest; xhr.open("GET", url, true); xhr.responseType = "arraybuffer"; xhr.onload = () => { if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                    onload(xhr.response);
                    return;
                } onerror(); }; xhr.onerror = onerror; xhr.send(null); };
            }
            setWindowTitle = title => document.title = title;
        }
        else { }
        var out = Module["print"] || console.log.bind(console);
        var err = Module["printErr"] || console.warn.bind(console);
        Object.assign(Module, moduleOverrides);
        moduleOverrides = null;
        if (Module["arguments"])
            arguments_ = Module["arguments"];
        if (Module["thisProgram"])
            thisProgram = Module["thisProgram"];
        if (Module["quit"])
            quit_ = Module["quit"];
        var wasmBinary;
        if (Module["wasmBinary"])
            wasmBinary = Module["wasmBinary"];
        var noExitRuntime = Module["noExitRuntime"] || true;
        if (typeof WebAssembly != "object") {
            abort("no native wasm support detected");
        }
        var wasmMemory;
        var ABORT = false;
        var EXITSTATUS;
        function assert(condition, text) { if (!condition) {
            abort(text);
        } }
        var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
        function updateMemoryViews() { var b = wasmMemory.buffer; Module["HEAP8"] = HEAP8 = new Int8Array(b); Module["HEAP16"] = HEAP16 = new Int16Array(b); Module["HEAP32"] = HEAP32 = new Int32Array(b); Module["HEAPU8"] = HEAPU8 = new Uint8Array(b); Module["HEAPU16"] = HEAPU16 = new Uint16Array(b); Module["HEAPU32"] = HEAPU32 = new Uint32Array(b); Module["HEAPF32"] = HEAPF32 = new Float32Array(b); Module["HEAPF64"] = HEAPF64 = new Float64Array(b); }
        var wasmTable;
        var __ATPRERUN__ = [];
        var __ATINIT__ = [];
        var __ATMAIN__ = [];
        var __ATPOSTRUN__ = [];
        var runtimeInitialized = false;
        var runtimeKeepaliveCounter = 0;
        function keepRuntimeAlive() { return noExitRuntime || runtimeKeepaliveCounter > 0; }
        function preRun() { if (Module["preRun"]) {
            if (typeof Module["preRun"] == "function")
                Module["preRun"] = [Module["preRun"]];
            while (Module["preRun"].length) {
                addOnPreRun(Module["preRun"].shift());
            }
        } callRuntimeCallbacks(__ATPRERUN__); }
        function initRuntime() { runtimeInitialized = true; if (!Module["noFSInit"] && !FS.init.initialized)
            FS.init(); FS.ignorePermissions = false; TTY.init(); callRuntimeCallbacks(__ATINIT__); }
        function preMain() { callRuntimeCallbacks(__ATMAIN__); }
        function postRun() { if (Module["postRun"]) {
            if (typeof Module["postRun"] == "function")
                Module["postRun"] = [Module["postRun"]];
            while (Module["postRun"].length) {
                addOnPostRun(Module["postRun"].shift());
            }
        } callRuntimeCallbacks(__ATPOSTRUN__); }
        function addOnPreRun(cb) { __ATPRERUN__.unshift(cb); }
        function addOnInit(cb) { __ATINIT__.unshift(cb); }
        function addOnPostRun(cb) { __ATPOSTRUN__.unshift(cb); }
        var runDependencies = 0;
        var runDependencyWatcher = null;
        var dependenciesFulfilled = null;
        function getUniqueRunDependency(id) { return id; }
        function addRunDependency(id) { runDependencies++; if (Module["monitorRunDependencies"]) {
            Module["monitorRunDependencies"](runDependencies);
        } }
        function removeRunDependency(id) { runDependencies--; if (Module["monitorRunDependencies"]) {
            Module["monitorRunDependencies"](runDependencies);
        } if (runDependencies == 0) {
            if (runDependencyWatcher !== null) {
                clearInterval(runDependencyWatcher);
                runDependencyWatcher = null;
            }
            if (dependenciesFulfilled) {
                var callback = dependenciesFulfilled;
                dependenciesFulfilled = null;
                callback();
            }
        } }
        function abort(what) { if (Module["onAbort"]) {
            Module["onAbort"](what);
        } what = "Aborted(" + what + ")"; err(what); ABORT = true; EXITSTATUS = 1; what += ". Build with -sASSERTIONS for more info."; var e = new WebAssembly.RuntimeError(what); readyPromiseReject(e); throw e; }
        var dataURIPrefix = "data:application/octet-stream;base64,";
        function isDataURI(filename) { return filename.startsWith(dataURIPrefix); }
        var wasmBinaryFile;
        if (Module["locateFile"]) {
            wasmBinaryFile = "rgbfix.wasm";
            if (!isDataURI(wasmBinaryFile)) {
                wasmBinaryFile = locateFile(wasmBinaryFile);
            }
        }
        else {
            wasmBinaryFile = new URL(/* asset import */ __webpack_require__(27077), __webpack_require__.b).href;
        }
        function getBinary(file) { try {
            if (file == wasmBinaryFile && wasmBinary) {
                return new Uint8Array(wasmBinary);
            }
            if (readBinary) {
                return readBinary(file);
            }
            throw "both async and sync fetching of the wasm failed";
        }
        catch (err) {
            abort(err);
        } }
        function getBinaryPromise(binaryFile) { if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
            if (typeof fetch == "function") {
                return fetch(binaryFile, { credentials: "same-origin" }).then(response => { if (!response["ok"]) {
                    throw "failed to load wasm binary file at '" + binaryFile + "'";
                } return response["arrayBuffer"](); }).catch(() => getBinary(binaryFile));
            }
        } return Promise.resolve().then(() => getBinary(binaryFile)); }
        function instantiateArrayBuffer(binaryFile, imports, receiver) { return getBinaryPromise(binaryFile).then(binary => { return WebAssembly.instantiate(binary, imports); }).then(instance => { return instance; }).then(receiver, reason => { err("failed to asynchronously prepare wasm: " + reason); abort(reason); }); }
        function instantiateAsync(binary, binaryFile, imports, callback) { if (!binary && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(binaryFile) && typeof fetch == "function") {
            return fetch(binaryFile, { credentials: "same-origin" }).then(response => { var result = WebAssembly.instantiateStreaming(response, imports); return result.then(callback, function (reason) { err("wasm streaming compile failed: " + reason); err("falling back to ArrayBuffer instantiation"); return instantiateArrayBuffer(binaryFile, imports, callback); }); });
        }
        else {
            return instantiateArrayBuffer(binaryFile, imports, callback);
        } }
        function createWasm() { var info = { "a": wasmImports }; function receiveInstance(instance, module) { var exports = instance.exports; Module["asm"] = exports; wasmMemory = Module["asm"]["m"]; updateMemoryViews(); wasmTable = Module["asm"]["p"]; addOnInit(Module["asm"]["n"]); removeRunDependency("wasm-instantiate"); return exports; } addRunDependency("wasm-instantiate"); function receiveInstantiationResult(result) { receiveInstance(result["instance"]); } if (Module["instantiateWasm"]) {
            try {
                return Module["instantiateWasm"](info, receiveInstance);
            }
            catch (e) {
                err("Module.instantiateWasm callback failed with error: " + e);
                readyPromiseReject(e);
            }
        } instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult).catch(readyPromiseReject); return {}; }
        var tempDouble;
        var tempI64;
        function ExitStatus(status) { this.name = "ExitStatus"; this.message = "Program terminated with exit(" + status + ")"; this.status = status; }
        function callRuntimeCallbacks(callbacks) { while (callbacks.length > 0) {
            callbacks.shift()(Module);
        } }
        var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : undefined;
        function UTF8ArrayToString(heapOrArray, idx, maxBytesToRead) { var endIdx = idx + maxBytesToRead; var endPtr = idx; while (heapOrArray[endPtr] && !(endPtr >= endIdx))
            ++endPtr; if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
            return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
        } var str = ""; while (idx < endPtr) {
            var u0 = heapOrArray[idx++];
            if (!(u0 & 128)) {
                str += String.fromCharCode(u0);
                continue;
            }
            var u1 = heapOrArray[idx++] & 63;
            if ((u0 & 224) == 192) {
                str += String.fromCharCode((u0 & 31) << 6 | u1);
                continue;
            }
            var u2 = heapOrArray[idx++] & 63;
            if ((u0 & 240) == 224) {
                u0 = (u0 & 15) << 12 | u1 << 6 | u2;
            }
            else {
                u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
            }
            if (u0 < 65536) {
                str += String.fromCharCode(u0);
            }
            else {
                var ch = u0 - 65536;
                str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
            }
        } return str; }
        function UTF8ToString(ptr, maxBytesToRead) { return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : ""; }
        function ___assert_fail(condition, filename, line, func) { abort("Assertion failed: " + UTF8ToString(condition) + ", at: " + [filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function"]); }
        var PATH = { isAbs: path => path.charAt(0) === "/", splitPath: filename => { var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/; return splitPathRe.exec(filename).slice(1); }, normalizeArray: (parts, allowAboveRoot) => { var up = 0; for (var i = parts.length - 1; i >= 0; i--) {
                var last = parts[i];
                if (last === ".") {
                    parts.splice(i, 1);
                }
                else if (last === "..") {
                    parts.splice(i, 1);
                    up++;
                }
                else if (up) {
                    parts.splice(i, 1);
                    up--;
                }
            } if (allowAboveRoot) {
                for (; up; up--) {
                    parts.unshift("..");
                }
            } return parts; }, normalize: path => { var isAbsolute = PATH.isAbs(path), trailingSlash = path.substr(-1) === "/"; path = PATH.normalizeArray(path.split("/").filter(p => !!p), !isAbsolute).join("/"); if (!path && !isAbsolute) {
                path = ".";
            } if (path && trailingSlash) {
                path += "/";
            } return (isAbsolute ? "/" : "") + path; }, dirname: path => { var result = PATH.splitPath(path), root = result[0], dir = result[1]; if (!root && !dir) {
                return ".";
            } if (dir) {
                dir = dir.substr(0, dir.length - 1);
            } return root + dir; }, basename: path => { if (path === "/")
                return "/"; path = PATH.normalize(path); path = path.replace(/\/$/, ""); var lastSlash = path.lastIndexOf("/"); if (lastSlash === -1)
                return path; return path.substr(lastSlash + 1); }, join: function () { var paths = Array.prototype.slice.call(arguments); return PATH.normalize(paths.join("/")); }, join2: (l, r) => { return PATH.normalize(l + "/" + r); } };
        function initRandomFill() { if (typeof crypto == "object" && typeof crypto["getRandomValues"] == "function") {
            return view => crypto.getRandomValues(view);
        }
        else
            abort("initRandomDevice"); }
        function randomFill(view) { return (randomFill = initRandomFill())(view); }
        var PATH_FS = { resolve: function () { var resolvedPath = "", resolvedAbsolute = false; for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
                var path = i >= 0 ? arguments[i] : FS.cwd();
                if (typeof path != "string") {
                    throw new TypeError("Arguments to path.resolve must be strings");
                }
                else if (!path) {
                    return "";
                }
                resolvedPath = path + "/" + resolvedPath;
                resolvedAbsolute = PATH.isAbs(path);
            } resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter(p => !!p), !resolvedAbsolute).join("/"); return (resolvedAbsolute ? "/" : "") + resolvedPath || "."; }, relative: (from, to) => { from = PATH_FS.resolve(from).substr(1); to = PATH_FS.resolve(to).substr(1); function trim(arr) { var start = 0; for (; start < arr.length; start++) {
                if (arr[start] !== "")
                    break;
            } var end = arr.length - 1; for (; end >= 0; end--) {
                if (arr[end] !== "")
                    break;
            } if (start > end)
                return []; return arr.slice(start, end - start + 1); } var fromParts = trim(from.split("/")); var toParts = trim(to.split("/")); var length = Math.min(fromParts.length, toParts.length); var samePartsLength = length; for (var i = 0; i < length; i++) {
                if (fromParts[i] !== toParts[i]) {
                    samePartsLength = i;
                    break;
                }
            } var outputParts = []; for (var i = samePartsLength; i < fromParts.length; i++) {
                outputParts.push("..");
            } outputParts = outputParts.concat(toParts.slice(samePartsLength)); return outputParts.join("/"); } };
        function lengthBytesUTF8(str) { var len = 0; for (var i = 0; i < str.length; ++i) {
            var c = str.charCodeAt(i);
            if (c <= 127) {
                len++;
            }
            else if (c <= 2047) {
                len += 2;
            }
            else if (c >= 55296 && c <= 57343) {
                len += 4;
                ++i;
            }
            else {
                len += 3;
            }
        } return len; }
        function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) { if (!(maxBytesToWrite > 0))
            return 0; var startIdx = outIdx; var endIdx = outIdx + maxBytesToWrite - 1; for (var i = 0; i < str.length; ++i) {
            var u = str.charCodeAt(i);
            if (u >= 55296 && u <= 57343) {
                var u1 = str.charCodeAt(++i);
                u = 65536 + ((u & 1023) << 10) | u1 & 1023;
            }
            if (u <= 127) {
                if (outIdx >= endIdx)
                    break;
                heap[outIdx++] = u;
            }
            else if (u <= 2047) {
                if (outIdx + 1 >= endIdx)
                    break;
                heap[outIdx++] = 192 | u >> 6;
                heap[outIdx++] = 128 | u & 63;
            }
            else if (u <= 65535) {
                if (outIdx + 2 >= endIdx)
                    break;
                heap[outIdx++] = 224 | u >> 12;
                heap[outIdx++] = 128 | u >> 6 & 63;
                heap[outIdx++] = 128 | u & 63;
            }
            else {
                if (outIdx + 3 >= endIdx)
                    break;
                heap[outIdx++] = 240 | u >> 18;
                heap[outIdx++] = 128 | u >> 12 & 63;
                heap[outIdx++] = 128 | u >> 6 & 63;
                heap[outIdx++] = 128 | u & 63;
            }
        } heap[outIdx] = 0; return outIdx - startIdx; }
        function intArrayFromString(stringy, dontAddNull, length) { var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1; var u8array = new Array(len); var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length); if (dontAddNull)
            u8array.length = numBytesWritten; return u8array; }
        var TTY = { ttys: [], init: function () { }, shutdown: function () { }, register: function (dev, ops) { TTY.ttys[dev] = { input: [], output: [], ops: ops }; FS.registerDevice(dev, TTY.stream_ops); }, stream_ops: { open: function (stream) { var tty = TTY.ttys[stream.node.rdev]; if (!tty) {
                    throw new FS.ErrnoError(43);
                } stream.tty = tty; stream.seekable = false; }, close: function (stream) { stream.tty.ops.fsync(stream.tty); }, fsync: function (stream) { stream.tty.ops.fsync(stream.tty); }, read: function (stream, buffer, offset, length, pos) { if (!stream.tty || !stream.tty.ops.get_char) {
                    throw new FS.ErrnoError(60);
                } var bytesRead = 0; for (var i = 0; i < length; i++) {
                    var result;
                    try {
                        result = stream.tty.ops.get_char(stream.tty);
                    }
                    catch (e) {
                        throw new FS.ErrnoError(29);
                    }
                    if (result === undefined && bytesRead === 0) {
                        throw new FS.ErrnoError(6);
                    }
                    if (result === null || result === undefined)
                        break;
                    bytesRead++;
                    buffer[offset + i] = result;
                } if (bytesRead) {
                    stream.node.timestamp = Date.now();
                } return bytesRead; }, write: function (stream, buffer, offset, length, pos) { if (!stream.tty || !stream.tty.ops.put_char) {
                    throw new FS.ErrnoError(60);
                } try {
                    for (var i = 0; i < length; i++) {
                        stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
                    }
                }
                catch (e) {
                    throw new FS.ErrnoError(29);
                } if (length) {
                    stream.node.timestamp = Date.now();
                } return i; } }, default_tty_ops: { get_char: function (tty) { if (!tty.input.length) {
                    var result = null;
                    if (typeof window != "undefined" && typeof window.prompt == "function") {
                        result = window.prompt("Input: ");
                        if (result !== null) {
                            result += "\n";
                        }
                    }
                    else if (typeof readline == "function") {
                        result = readline();
                        if (result !== null) {
                            result += "\n";
                        }
                    }
                    if (!result) {
                        return null;
                    }
                    tty.input = intArrayFromString(result, true);
                } return tty.input.shift(); }, put_char: function (tty, val) { if (val === null || val === 10) {
                    out(UTF8ArrayToString(tty.output, 0));
                    tty.output = [];
                }
                else {
                    if (val != 0)
                        tty.output.push(val);
                } }, fsync: function (tty) { if (tty.output && tty.output.length > 0) {
                    out(UTF8ArrayToString(tty.output, 0));
                    tty.output = [];
                } } }, default_tty1_ops: { put_char: function (tty, val) { if (val === null || val === 10) {
                    err(UTF8ArrayToString(tty.output, 0));
                    tty.output = [];
                }
                else {
                    if (val != 0)
                        tty.output.push(val);
                } }, fsync: function (tty) { if (tty.output && tty.output.length > 0) {
                    err(UTF8ArrayToString(tty.output, 0));
                    tty.output = [];
                } } } };
        function mmapAlloc(size) { abort(); }
        var MEMFS = { ops_table: null, mount: function (mount) { return MEMFS.createNode(null, "/", 16384 | 511, 0); }, createNode: function (parent, name, mode, dev) { if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
                throw new FS.ErrnoError(63);
            } if (!MEMFS.ops_table) {
                MEMFS.ops_table = { dir: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, lookup: MEMFS.node_ops.lookup, mknod: MEMFS.node_ops.mknod, rename: MEMFS.node_ops.rename, unlink: MEMFS.node_ops.unlink, rmdir: MEMFS.node_ops.rmdir, readdir: MEMFS.node_ops.readdir, symlink: MEMFS.node_ops.symlink }, stream: { llseek: MEMFS.stream_ops.llseek } }, file: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr }, stream: { llseek: MEMFS.stream_ops.llseek, read: MEMFS.stream_ops.read, write: MEMFS.stream_ops.write, allocate: MEMFS.stream_ops.allocate, mmap: MEMFS.stream_ops.mmap, msync: MEMFS.stream_ops.msync } }, link: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, readlink: MEMFS.node_ops.readlink }, stream: {} }, chrdev: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr }, stream: FS.chrdev_stream_ops } };
            } var node = FS.createNode(parent, name, mode, dev); if (FS.isDir(node.mode)) {
                node.node_ops = MEMFS.ops_table.dir.node;
                node.stream_ops = MEMFS.ops_table.dir.stream;
                node.contents = {};
            }
            else if (FS.isFile(node.mode)) {
                node.node_ops = MEMFS.ops_table.file.node;
                node.stream_ops = MEMFS.ops_table.file.stream;
                node.usedBytes = 0;
                node.contents = null;
            }
            else if (FS.isLink(node.mode)) {
                node.node_ops = MEMFS.ops_table.link.node;
                node.stream_ops = MEMFS.ops_table.link.stream;
            }
            else if (FS.isChrdev(node.mode)) {
                node.node_ops = MEMFS.ops_table.chrdev.node;
                node.stream_ops = MEMFS.ops_table.chrdev.stream;
            } node.timestamp = Date.now(); if (parent) {
                parent.contents[name] = node;
                parent.timestamp = node.timestamp;
            } return node; }, getFileDataAsTypedArray: function (node) { if (!node.contents)
                return new Uint8Array(0); if (node.contents.subarray)
                return node.contents.subarray(0, node.usedBytes); return new Uint8Array(node.contents); }, expandFileStorage: function (node, newCapacity) { var prevCapacity = node.contents ? node.contents.length : 0; if (prevCapacity >= newCapacity)
                return; var CAPACITY_DOUBLING_MAX = 1024 * 1024; newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) >>> 0); if (prevCapacity != 0)
                newCapacity = Math.max(newCapacity, 256); var oldContents = node.contents; node.contents = new Uint8Array(newCapacity); if (node.usedBytes > 0)
                node.contents.set(oldContents.subarray(0, node.usedBytes), 0); }, resizeFileStorage: function (node, newSize) { if (node.usedBytes == newSize)
                return; if (newSize == 0) {
                node.contents = null;
                node.usedBytes = 0;
            }
            else {
                var oldContents = node.contents;
                node.contents = new Uint8Array(newSize);
                if (oldContents) {
                    node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
                }
                node.usedBytes = newSize;
            } }, node_ops: { getattr: function (node) { var attr = {}; attr.dev = FS.isChrdev(node.mode) ? node.id : 1; attr.ino = node.id; attr.mode = node.mode; attr.nlink = 1; attr.uid = 0; attr.gid = 0; attr.rdev = node.rdev; if (FS.isDir(node.mode)) {
                    attr.size = 4096;
                }
                else if (FS.isFile(node.mode)) {
                    attr.size = node.usedBytes;
                }
                else if (FS.isLink(node.mode)) {
                    attr.size = node.link.length;
                }
                else {
                    attr.size = 0;
                } attr.atime = new Date(node.timestamp); attr.mtime = new Date(node.timestamp); attr.ctime = new Date(node.timestamp); attr.blksize = 4096; attr.blocks = Math.ceil(attr.size / attr.blksize); return attr; }, setattr: function (node, attr) { if (attr.mode !== undefined) {
                    node.mode = attr.mode;
                } if (attr.timestamp !== undefined) {
                    node.timestamp = attr.timestamp;
                } if (attr.size !== undefined) {
                    MEMFS.resizeFileStorage(node, attr.size);
                } }, lookup: function (parent, name) { throw FS.genericErrors[44]; }, mknod: function (parent, name, mode, dev) { return MEMFS.createNode(parent, name, mode, dev); }, rename: function (old_node, new_dir, new_name) { if (FS.isDir(old_node.mode)) {
                    var new_node;
                    try {
                        new_node = FS.lookupNode(new_dir, new_name);
                    }
                    catch (e) { }
                    if (new_node) {
                        for (var i in new_node.contents) {
                            throw new FS.ErrnoError(55);
                        }
                    }
                } delete old_node.parent.contents[old_node.name]; old_node.parent.timestamp = Date.now(); old_node.name = new_name; new_dir.contents[new_name] = old_node; new_dir.timestamp = old_node.parent.timestamp; old_node.parent = new_dir; }, unlink: function (parent, name) { delete parent.contents[name]; parent.timestamp = Date.now(); }, rmdir: function (parent, name) { var node = FS.lookupNode(parent, name); for (var i in node.contents) {
                    throw new FS.ErrnoError(55);
                } delete parent.contents[name]; parent.timestamp = Date.now(); }, readdir: function (node) { var entries = [".", ".."]; for (var key in node.contents) {
                    if (!node.contents.hasOwnProperty(key)) {
                        continue;
                    }
                    entries.push(key);
                } return entries; }, symlink: function (parent, newname, oldpath) { var node = MEMFS.createNode(parent, newname, 511 | 40960, 0); node.link = oldpath; return node; }, readlink: function (node) { if (!FS.isLink(node.mode)) {
                    throw new FS.ErrnoError(28);
                } return node.link; } }, stream_ops: { read: function (stream, buffer, offset, length, position) { var contents = stream.node.contents; if (position >= stream.node.usedBytes)
                    return 0; var size = Math.min(stream.node.usedBytes - position, length); if (size > 8 && contents.subarray) {
                    buffer.set(contents.subarray(position, position + size), offset);
                }
                else {
                    for (var i = 0; i < size; i++)
                        buffer[offset + i] = contents[position + i];
                } return size; }, write: function (stream, buffer, offset, length, position, canOwn) { if (!length)
                    return 0; var node = stream.node; node.timestamp = Date.now(); if (buffer.subarray && (!node.contents || node.contents.subarray)) {
                    if (canOwn) {
                        node.contents = buffer.subarray(offset, offset + length);
                        node.usedBytes = length;
                        return length;
                    }
                    else if (node.usedBytes === 0 && position === 0) {
                        node.contents = buffer.slice(offset, offset + length);
                        node.usedBytes = length;
                        return length;
                    }
                    else if (position + length <= node.usedBytes) {
                        node.contents.set(buffer.subarray(offset, offset + length), position);
                        return length;
                    }
                } MEMFS.expandFileStorage(node, position + length); if (node.contents.subarray && buffer.subarray) {
                    node.contents.set(buffer.subarray(offset, offset + length), position);
                }
                else {
                    for (var i = 0; i < length; i++) {
                        node.contents[position + i] = buffer[offset + i];
                    }
                } node.usedBytes = Math.max(node.usedBytes, position + length); return length; }, llseek: function (stream, offset, whence) { var position = offset; if (whence === 1) {
                    position += stream.position;
                }
                else if (whence === 2) {
                    if (FS.isFile(stream.node.mode)) {
                        position += stream.node.usedBytes;
                    }
                } if (position < 0) {
                    throw new FS.ErrnoError(28);
                } return position; }, allocate: function (stream, offset, length) { MEMFS.expandFileStorage(stream.node, offset + length); stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length); }, mmap: function (stream, length, position, prot, flags) { if (!FS.isFile(stream.node.mode)) {
                    throw new FS.ErrnoError(43);
                } var ptr; var allocated; var contents = stream.node.contents; if (!(flags & 2) && contents.buffer === HEAP8.buffer) {
                    allocated = false;
                    ptr = contents.byteOffset;
                }
                else {
                    if (position > 0 || position + length < contents.length) {
                        if (contents.subarray) {
                            contents = contents.subarray(position, position + length);
                        }
                        else {
                            contents = Array.prototype.slice.call(contents, position, position + length);
                        }
                    }
                    allocated = true;
                    ptr = mmapAlloc(length);
                    if (!ptr) {
                        throw new FS.ErrnoError(48);
                    }
                    HEAP8.set(contents, ptr);
                } return { ptr: ptr, allocated: allocated }; }, msync: function (stream, buffer, offset, length, mmapFlags) { MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false); return 0; } } };
        function asyncLoad(url, onload, onerror, noRunDep) { var dep = !noRunDep ? getUniqueRunDependency("al " + url) : ""; readAsync(url, arrayBuffer => { assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).'); onload(new Uint8Array(arrayBuffer)); if (dep)
            removeRunDependency(dep); }, event => { if (onerror) {
            onerror();
        }
        else {
            throw 'Loading data file "' + url + '" failed.';
        } }); if (dep)
            addRunDependency(dep); }
        var FS = { root: null, mounts: [], devices: {}, streams: [], nextInode: 1, nameTable: null, currentPath: "/", initialized: false, ignorePermissions: true, ErrnoError: null, genericErrors: {}, filesystems: null, syncFSRequests: 0, lookupPath: (path, opts = {}) => { path = PATH_FS.resolve(path); if (!path)
                return { path: "", node: null }; var defaults = { follow_mount: true, recurse_count: 0 }; opts = Object.assign(defaults, opts); if (opts.recurse_count > 8) {
                throw new FS.ErrnoError(32);
            } var parts = path.split("/").filter(p => !!p); var current = FS.root; var current_path = "/"; for (var i = 0; i < parts.length; i++) {
                var islast = i === parts.length - 1;
                if (islast && opts.parent) {
                    break;
                }
                current = FS.lookupNode(current, parts[i]);
                current_path = PATH.join2(current_path, parts[i]);
                if (FS.isMountpoint(current)) {
                    if (!islast || islast && opts.follow_mount) {
                        current = current.mounted.root;
                    }
                }
                if (!islast || opts.follow) {
                    var count = 0;
                    while (FS.isLink(current.mode)) {
                        var link = FS.readlink(current_path);
                        current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
                        var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count + 1 });
                        current = lookup.node;
                        if (count++ > 40) {
                            throw new FS.ErrnoError(32);
                        }
                    }
                }
            } return { path: current_path, node: current }; }, getPath: node => { var path; while (true) {
                if (FS.isRoot(node)) {
                    var mount = node.mount.mountpoint;
                    if (!path)
                        return mount;
                    return mount[mount.length - 1] !== "/" ? mount + "/" + path : mount + path;
                }
                path = path ? node.name + "/" + path : node.name;
                node = node.parent;
            } }, hashName: (parentid, name) => { var hash = 0; for (var i = 0; i < name.length; i++) {
                hash = (hash << 5) - hash + name.charCodeAt(i) | 0;
            } return (parentid + hash >>> 0) % FS.nameTable.length; }, hashAddNode: node => { var hash = FS.hashName(node.parent.id, node.name); node.name_next = FS.nameTable[hash]; FS.nameTable[hash] = node; }, hashRemoveNode: node => { var hash = FS.hashName(node.parent.id, node.name); if (FS.nameTable[hash] === node) {
                FS.nameTable[hash] = node.name_next;
            }
            else {
                var current = FS.nameTable[hash];
                while (current) {
                    if (current.name_next === node) {
                        current.name_next = node.name_next;
                        break;
                    }
                    current = current.name_next;
                }
            } }, lookupNode: (parent, name) => { var errCode = FS.mayLookup(parent); if (errCode) {
                throw new FS.ErrnoError(errCode, parent);
            } var hash = FS.hashName(parent.id, name); for (var node = FS.nameTable[hash]; node; node = node.name_next) {
                var nodeName = node.name;
                if (node.parent.id === parent.id && nodeName === name) {
                    return node;
                }
            } return FS.lookup(parent, name); }, createNode: (parent, name, mode, rdev) => { var node = new FS.FSNode(parent, name, mode, rdev); FS.hashAddNode(node); return node; }, destroyNode: node => { FS.hashRemoveNode(node); }, isRoot: node => { return node === node.parent; }, isMountpoint: node => { return !!node.mounted; }, isFile: mode => { return (mode & 61440) === 32768; }, isDir: mode => { return (mode & 61440) === 16384; }, isLink: mode => { return (mode & 61440) === 40960; }, isChrdev: mode => { return (mode & 61440) === 8192; }, isBlkdev: mode => { return (mode & 61440) === 24576; }, isFIFO: mode => { return (mode & 61440) === 4096; }, isSocket: mode => { return (mode & 49152) === 49152; }, flagModes: { "r": 0, "r+": 2, "w": 577, "w+": 578, "a": 1089, "a+": 1090 }, modeStringToFlags: str => { var flags = FS.flagModes[str]; if (typeof flags == "undefined") {
                throw new Error("Unknown file open mode: " + str);
            } return flags; }, flagsToPermissionString: flag => { var perms = ["r", "w", "rw"][flag & 3]; if (flag & 512) {
                perms += "w";
            } return perms; }, nodePermissions: (node, perms) => { if (FS.ignorePermissions) {
                return 0;
            } if (perms.includes("r") && !(node.mode & 292)) {
                return 2;
            }
            else if (perms.includes("w") && !(node.mode & 146)) {
                return 2;
            }
            else if (perms.includes("x") && !(node.mode & 73)) {
                return 2;
            } return 0; }, mayLookup: dir => { var errCode = FS.nodePermissions(dir, "x"); if (errCode)
                return errCode; if (!dir.node_ops.lookup)
                return 2; return 0; }, mayCreate: (dir, name) => { try {
                var node = FS.lookupNode(dir, name);
                return 20;
            }
            catch (e) { } return FS.nodePermissions(dir, "wx"); }, mayDelete: (dir, name, isdir) => { var node; try {
                node = FS.lookupNode(dir, name);
            }
            catch (e) {
                return e.errno;
            } var errCode = FS.nodePermissions(dir, "wx"); if (errCode) {
                return errCode;
            } if (isdir) {
                if (!FS.isDir(node.mode)) {
                    return 54;
                }
                if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
                    return 10;
                }
            }
            else {
                if (FS.isDir(node.mode)) {
                    return 31;
                }
            } return 0; }, mayOpen: (node, flags) => { if (!node) {
                return 44;
            } if (FS.isLink(node.mode)) {
                return 32;
            }
            else if (FS.isDir(node.mode)) {
                if (FS.flagsToPermissionString(flags) !== "r" || flags & 512) {
                    return 31;
                }
            } return FS.nodePermissions(node, FS.flagsToPermissionString(flags)); }, MAX_OPEN_FDS: 4096, nextfd: (fd_start = 0, fd_end = FS.MAX_OPEN_FDS) => { for (var fd = fd_start; fd <= fd_end; fd++) {
                if (!FS.streams[fd]) {
                    return fd;
                }
            } throw new FS.ErrnoError(33); }, getStream: fd => FS.streams[fd], createStream: (stream, fd_start, fd_end) => { if (!FS.FSStream) {
                FS.FSStream = function () { this.shared = {}; };
                FS.FSStream.prototype = {};
                Object.defineProperties(FS.FSStream.prototype, { object: { get: function () { return this.node; }, set: function (val) { this.node = val; } }, isRead: { get: function () { return (this.flags & 2097155) !== 1; } }, isWrite: { get: function () { return (this.flags & 2097155) !== 0; } }, isAppend: { get: function () { return this.flags & 1024; } }, flags: { get: function () { return this.shared.flags; }, set: function (val) { this.shared.flags = val; } }, position: { get: function () { return this.shared.position; }, set: function (val) { this.shared.position = val; } } });
            } stream = Object.assign(new FS.FSStream, stream); var fd = FS.nextfd(fd_start, fd_end); stream.fd = fd; FS.streams[fd] = stream; return stream; }, closeStream: fd => { FS.streams[fd] = null; }, chrdev_stream_ops: { open: stream => { var device = FS.getDevice(stream.node.rdev); stream.stream_ops = device.stream_ops; if (stream.stream_ops.open) {
                    stream.stream_ops.open(stream);
                } }, llseek: () => { throw new FS.ErrnoError(70); } }, major: dev => dev >> 8, minor: dev => dev & 255, makedev: (ma, mi) => ma << 8 | mi, registerDevice: (dev, ops) => { FS.devices[dev] = { stream_ops: ops }; }, getDevice: dev => FS.devices[dev], getMounts: mount => { var mounts = []; var check = [mount]; while (check.length) {
                var m = check.pop();
                mounts.push(m);
                check.push.apply(check, m.mounts);
            } return mounts; }, syncfs: (populate, callback) => { if (typeof populate == "function") {
                callback = populate;
                populate = false;
            } FS.syncFSRequests++; if (FS.syncFSRequests > 1) {
                err("warning: " + FS.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work");
            } var mounts = FS.getMounts(FS.root.mount); var completed = 0; function doCallback(errCode) { FS.syncFSRequests--; return callback(errCode); } function done(errCode) { if (errCode) {
                if (!done.errored) {
                    done.errored = true;
                    return doCallback(errCode);
                }
                return;
            } if (++completed >= mounts.length) {
                doCallback(null);
            } } mounts.forEach(mount => { if (!mount.type.syncfs) {
                return done(null);
            } mount.type.syncfs(mount, populate, done); }); }, mount: (type, opts, mountpoint) => { var root = mountpoint === "/"; var pseudo = !mountpoint; var node; if (root && FS.root) {
                throw new FS.ErrnoError(10);
            }
            else if (!root && !pseudo) {
                var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
                mountpoint = lookup.path;
                node = lookup.node;
                if (FS.isMountpoint(node)) {
                    throw new FS.ErrnoError(10);
                }
                if (!FS.isDir(node.mode)) {
                    throw new FS.ErrnoError(54);
                }
            } var mount = { type: type, opts: opts, mountpoint: mountpoint, mounts: [] }; var mountRoot = type.mount(mount); mountRoot.mount = mount; mount.root = mountRoot; if (root) {
                FS.root = mountRoot;
            }
            else if (node) {
                node.mounted = mount;
                if (node.mount) {
                    node.mount.mounts.push(mount);
                }
            } return mountRoot; }, unmount: mountpoint => { var lookup = FS.lookupPath(mountpoint, { follow_mount: false }); if (!FS.isMountpoint(lookup.node)) {
                throw new FS.ErrnoError(28);
            } var node = lookup.node; var mount = node.mounted; var mounts = FS.getMounts(mount); Object.keys(FS.nameTable).forEach(hash => { var current = FS.nameTable[hash]; while (current) {
                var next = current.name_next;
                if (mounts.includes(current.mount)) {
                    FS.destroyNode(current);
                }
                current = next;
            } }); node.mounted = null; var idx = node.mount.mounts.indexOf(mount); node.mount.mounts.splice(idx, 1); }, lookup: (parent, name) => { return parent.node_ops.lookup(parent, name); }, mknod: (path, mode, dev) => { var lookup = FS.lookupPath(path, { parent: true }); var parent = lookup.node; var name = PATH.basename(path); if (!name || name === "." || name === "..") {
                throw new FS.ErrnoError(28);
            } var errCode = FS.mayCreate(parent, name); if (errCode) {
                throw new FS.ErrnoError(errCode);
            } if (!parent.node_ops.mknod) {
                throw new FS.ErrnoError(63);
            } return parent.node_ops.mknod(parent, name, mode, dev); }, create: (path, mode) => { mode = mode !== undefined ? mode : 438; mode &= 4095; mode |= 32768; return FS.mknod(path, mode, 0); }, mkdir: (path, mode) => { mode = mode !== undefined ? mode : 511; mode &= 511 | 512; mode |= 16384; return FS.mknod(path, mode, 0); }, mkdirTree: (path, mode) => { var dirs = path.split("/"); var d = ""; for (var i = 0; i < dirs.length; ++i) {
                if (!dirs[i])
                    continue;
                d += "/" + dirs[i];
                try {
                    FS.mkdir(d, mode);
                }
                catch (e) {
                    if (e.errno != 20)
                        throw e;
                }
            } }, mkdev: (path, mode, dev) => { if (typeof dev == "undefined") {
                dev = mode;
                mode = 438;
            } mode |= 8192; return FS.mknod(path, mode, dev); }, symlink: (oldpath, newpath) => { if (!PATH_FS.resolve(oldpath)) {
                throw new FS.ErrnoError(44);
            } var lookup = FS.lookupPath(newpath, { parent: true }); var parent = lookup.node; if (!parent) {
                throw new FS.ErrnoError(44);
            } var newname = PATH.basename(newpath); var errCode = FS.mayCreate(parent, newname); if (errCode) {
                throw new FS.ErrnoError(errCode);
            } if (!parent.node_ops.symlink) {
                throw new FS.ErrnoError(63);
            } return parent.node_ops.symlink(parent, newname, oldpath); }, rename: (old_path, new_path) => { var old_dirname = PATH.dirname(old_path); var new_dirname = PATH.dirname(new_path); var old_name = PATH.basename(old_path); var new_name = PATH.basename(new_path); var lookup, old_dir, new_dir; lookup = FS.lookupPath(old_path, { parent: true }); old_dir = lookup.node; lookup = FS.lookupPath(new_path, { parent: true }); new_dir = lookup.node; if (!old_dir || !new_dir)
                throw new FS.ErrnoError(44); if (old_dir.mount !== new_dir.mount) {
                throw new FS.ErrnoError(75);
            } var old_node = FS.lookupNode(old_dir, old_name); var relative = PATH_FS.relative(old_path, new_dirname); if (relative.charAt(0) !== ".") {
                throw new FS.ErrnoError(28);
            } relative = PATH_FS.relative(new_path, old_dirname); if (relative.charAt(0) !== ".") {
                throw new FS.ErrnoError(55);
            } var new_node; try {
                new_node = FS.lookupNode(new_dir, new_name);
            }
            catch (e) { } if (old_node === new_node) {
                return;
            } var isdir = FS.isDir(old_node.mode); var errCode = FS.mayDelete(old_dir, old_name, isdir); if (errCode) {
                throw new FS.ErrnoError(errCode);
            } errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name); if (errCode) {
                throw new FS.ErrnoError(errCode);
            } if (!old_dir.node_ops.rename) {
                throw new FS.ErrnoError(63);
            } if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
                throw new FS.ErrnoError(10);
            } if (new_dir !== old_dir) {
                errCode = FS.nodePermissions(old_dir, "w");
                if (errCode) {
                    throw new FS.ErrnoError(errCode);
                }
            } FS.hashRemoveNode(old_node); try {
                old_dir.node_ops.rename(old_node, new_dir, new_name);
            }
            catch (e) {
                throw e;
            }
            finally {
                FS.hashAddNode(old_node);
            } }, rmdir: path => { var lookup = FS.lookupPath(path, { parent: true }); var parent = lookup.node; var name = PATH.basename(path); var node = FS.lookupNode(parent, name); var errCode = FS.mayDelete(parent, name, true); if (errCode) {
                throw new FS.ErrnoError(errCode);
            } if (!parent.node_ops.rmdir) {
                throw new FS.ErrnoError(63);
            } if (FS.isMountpoint(node)) {
                throw new FS.ErrnoError(10);
            } parent.node_ops.rmdir(parent, name); FS.destroyNode(node); }, readdir: path => { var lookup = FS.lookupPath(path, { follow: true }); var node = lookup.node; if (!node.node_ops.readdir) {
                throw new FS.ErrnoError(54);
            } return node.node_ops.readdir(node); }, unlink: path => { var lookup = FS.lookupPath(path, { parent: true }); var parent = lookup.node; if (!parent) {
                throw new FS.ErrnoError(44);
            } var name = PATH.basename(path); var node = FS.lookupNode(parent, name); var errCode = FS.mayDelete(parent, name, false); if (errCode) {
                throw new FS.ErrnoError(errCode);
            } if (!parent.node_ops.unlink) {
                throw new FS.ErrnoError(63);
            } if (FS.isMountpoint(node)) {
                throw new FS.ErrnoError(10);
            } parent.node_ops.unlink(parent, name); FS.destroyNode(node); }, readlink: path => { var lookup = FS.lookupPath(path); var link = lookup.node; if (!link) {
                throw new FS.ErrnoError(44);
            } if (!link.node_ops.readlink) {
                throw new FS.ErrnoError(28);
            } return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link)); }, stat: (path, dontFollow) => { var lookup = FS.lookupPath(path, { follow: !dontFollow }); var node = lookup.node; if (!node) {
                throw new FS.ErrnoError(44);
            } if (!node.node_ops.getattr) {
                throw new FS.ErrnoError(63);
            } return node.node_ops.getattr(node); }, lstat: path => { return FS.stat(path, true); }, chmod: (path, mode, dontFollow) => { var node; if (typeof path == "string") {
                var lookup = FS.lookupPath(path, { follow: !dontFollow });
                node = lookup.node;
            }
            else {
                node = path;
            } if (!node.node_ops.setattr) {
                throw new FS.ErrnoError(63);
            } node.node_ops.setattr(node, { mode: mode & 4095 | node.mode & ~4095, timestamp: Date.now() }); }, lchmod: (path, mode) => { FS.chmod(path, mode, true); }, fchmod: (fd, mode) => { var stream = FS.getStream(fd); if (!stream) {
                throw new FS.ErrnoError(8);
            } FS.chmod(stream.node, mode); }, chown: (path, uid, gid, dontFollow) => { var node; if (typeof path == "string") {
                var lookup = FS.lookupPath(path, { follow: !dontFollow });
                node = lookup.node;
            }
            else {
                node = path;
            } if (!node.node_ops.setattr) {
                throw new FS.ErrnoError(63);
            } node.node_ops.setattr(node, { timestamp: Date.now() }); }, lchown: (path, uid, gid) => { FS.chown(path, uid, gid, true); }, fchown: (fd, uid, gid) => { var stream = FS.getStream(fd); if (!stream) {
                throw new FS.ErrnoError(8);
            } FS.chown(stream.node, uid, gid); }, truncate: (path, len) => { if (len < 0) {
                throw new FS.ErrnoError(28);
            } var node; if (typeof path == "string") {
                var lookup = FS.lookupPath(path, { follow: true });
                node = lookup.node;
            }
            else {
                node = path;
            } if (!node.node_ops.setattr) {
                throw new FS.ErrnoError(63);
            } if (FS.isDir(node.mode)) {
                throw new FS.ErrnoError(31);
            } if (!FS.isFile(node.mode)) {
                throw new FS.ErrnoError(28);
            } var errCode = FS.nodePermissions(node, "w"); if (errCode) {
                throw new FS.ErrnoError(errCode);
            } node.node_ops.setattr(node, { size: len, timestamp: Date.now() }); }, ftruncate: (fd, len) => { var stream = FS.getStream(fd); if (!stream) {
                throw new FS.ErrnoError(8);
            } if ((stream.flags & 2097155) === 0) {
                throw new FS.ErrnoError(28);
            } FS.truncate(stream.node, len); }, utime: (path, atime, mtime) => { var lookup = FS.lookupPath(path, { follow: true }); var node = lookup.node; node.node_ops.setattr(node, { timestamp: Math.max(atime, mtime) }); }, open: (path, flags, mode) => { if (path === "") {
                throw new FS.ErrnoError(44);
            } flags = typeof flags == "string" ? FS.modeStringToFlags(flags) : flags; mode = typeof mode == "undefined" ? 438 : mode; if (flags & 64) {
                mode = mode & 4095 | 32768;
            }
            else {
                mode = 0;
            } var node; if (typeof path == "object") {
                node = path;
            }
            else {
                path = PATH.normalize(path);
                try {
                    var lookup = FS.lookupPath(path, { follow: !(flags & 131072) });
                    node = lookup.node;
                }
                catch (e) { }
            } var created = false; if (flags & 64) {
                if (node) {
                    if (flags & 128) {
                        throw new FS.ErrnoError(20);
                    }
                }
                else {
                    node = FS.mknod(path, mode, 0);
                    created = true;
                }
            } if (!node) {
                throw new FS.ErrnoError(44);
            } if (FS.isChrdev(node.mode)) {
                flags &= ~512;
            } if (flags & 65536 && !FS.isDir(node.mode)) {
                throw new FS.ErrnoError(54);
            } if (!created) {
                var errCode = FS.mayOpen(node, flags);
                if (errCode) {
                    throw new FS.ErrnoError(errCode);
                }
            } if (flags & 512 && !created) {
                FS.truncate(node, 0);
            } flags &= ~(128 | 512 | 131072); var stream = FS.createStream({ node: node, path: FS.getPath(node), flags: flags, seekable: true, position: 0, stream_ops: node.stream_ops, ungotten: [], error: false }); if (stream.stream_ops.open) {
                stream.stream_ops.open(stream);
            } if (Module["logReadFiles"] && !(flags & 1)) {
                if (!FS.readFiles)
                    FS.readFiles = {};
                if (!(path in FS.readFiles)) {
                    FS.readFiles[path] = 1;
                }
            } return stream; }, close: stream => { if (FS.isClosed(stream)) {
                throw new FS.ErrnoError(8);
            } if (stream.getdents)
                stream.getdents = null; try {
                if (stream.stream_ops.close) {
                    stream.stream_ops.close(stream);
                }
            }
            catch (e) {
                throw e;
            }
            finally {
                FS.closeStream(stream.fd);
            } stream.fd = null; }, isClosed: stream => { return stream.fd === null; }, llseek: (stream, offset, whence) => { if (FS.isClosed(stream)) {
                throw new FS.ErrnoError(8);
            } if (!stream.seekable || !stream.stream_ops.llseek) {
                throw new FS.ErrnoError(70);
            } if (whence != 0 && whence != 1 && whence != 2) {
                throw new FS.ErrnoError(28);
            } stream.position = stream.stream_ops.llseek(stream, offset, whence); stream.ungotten = []; return stream.position; }, read: (stream, buffer, offset, length, position) => { if (length < 0 || position < 0) {
                throw new FS.ErrnoError(28);
            } if (FS.isClosed(stream)) {
                throw new FS.ErrnoError(8);
            } if ((stream.flags & 2097155) === 1) {
                throw new FS.ErrnoError(8);
            } if (FS.isDir(stream.node.mode)) {
                throw new FS.ErrnoError(31);
            } if (!stream.stream_ops.read) {
                throw new FS.ErrnoError(28);
            } var seeking = typeof position != "undefined"; if (!seeking) {
                position = stream.position;
            }
            else if (!stream.seekable) {
                throw new FS.ErrnoError(70);
            } var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position); if (!seeking)
                stream.position += bytesRead; return bytesRead; }, write: (stream, buffer, offset, length, position, canOwn) => { if (length < 0 || position < 0) {
                throw new FS.ErrnoError(28);
            } if (FS.isClosed(stream)) {
                throw new FS.ErrnoError(8);
            } if ((stream.flags & 2097155) === 0) {
                throw new FS.ErrnoError(8);
            } if (FS.isDir(stream.node.mode)) {
                throw new FS.ErrnoError(31);
            } if (!stream.stream_ops.write) {
                throw new FS.ErrnoError(28);
            } if (stream.seekable && stream.flags & 1024) {
                FS.llseek(stream, 0, 2);
            } var seeking = typeof position != "undefined"; if (!seeking) {
                position = stream.position;
            }
            else if (!stream.seekable) {
                throw new FS.ErrnoError(70);
            } var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn); if (!seeking)
                stream.position += bytesWritten; return bytesWritten; }, allocate: (stream, offset, length) => { if (FS.isClosed(stream)) {
                throw new FS.ErrnoError(8);
            } if (offset < 0 || length <= 0) {
                throw new FS.ErrnoError(28);
            } if ((stream.flags & 2097155) === 0) {
                throw new FS.ErrnoError(8);
            } if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
                throw new FS.ErrnoError(43);
            } if (!stream.stream_ops.allocate) {
                throw new FS.ErrnoError(138);
            } stream.stream_ops.allocate(stream, offset, length); }, mmap: (stream, length, position, prot, flags) => { if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
                throw new FS.ErrnoError(2);
            } if ((stream.flags & 2097155) === 1) {
                throw new FS.ErrnoError(2);
            } if (!stream.stream_ops.mmap) {
                throw new FS.ErrnoError(43);
            } return stream.stream_ops.mmap(stream, length, position, prot, flags); }, msync: (stream, buffer, offset, length, mmapFlags) => { if (!stream.stream_ops.msync) {
                return 0;
            } return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags); }, munmap: stream => 0, ioctl: (stream, cmd, arg) => { if (!stream.stream_ops.ioctl) {
                throw new FS.ErrnoError(59);
            } return stream.stream_ops.ioctl(stream, cmd, arg); }, readFile: (path, opts = {}) => { opts.flags = opts.flags || 0; opts.encoding = opts.encoding || "binary"; if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
                throw new Error('Invalid encoding type "' + opts.encoding + '"');
            } var ret; var stream = FS.open(path, opts.flags); var stat = FS.stat(path); var length = stat.size; var buf = new Uint8Array(length); FS.read(stream, buf, 0, length, 0); if (opts.encoding === "utf8") {
                ret = UTF8ArrayToString(buf, 0);
            }
            else if (opts.encoding === "binary") {
                ret = buf;
            } FS.close(stream); return ret; }, writeFile: (path, data, opts = {}) => { opts.flags = opts.flags || 577; var stream = FS.open(path, opts.flags, opts.mode); if (typeof data == "string") {
                var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
                var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
                FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
            }
            else if (ArrayBuffer.isView(data)) {
                FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
            }
            else {
                throw new Error("Unsupported data type");
            } FS.close(stream); }, cwd: () => FS.currentPath, chdir: path => { var lookup = FS.lookupPath(path, { follow: true }); if (lookup.node === null) {
                throw new FS.ErrnoError(44);
            } if (!FS.isDir(lookup.node.mode)) {
                throw new FS.ErrnoError(54);
            } var errCode = FS.nodePermissions(lookup.node, "x"); if (errCode) {
                throw new FS.ErrnoError(errCode);
            } FS.currentPath = lookup.path; }, createDefaultDirectories: () => { FS.mkdir("/tmp"); FS.mkdir("/home"); FS.mkdir("/home/web_user"); }, createDefaultDevices: () => { FS.mkdir("/dev"); FS.registerDevice(FS.makedev(1, 3), { read: () => 0, write: (stream, buffer, offset, length, pos) => length }); FS.mkdev("/dev/null", FS.makedev(1, 3)); TTY.register(FS.makedev(5, 0), TTY.default_tty_ops); TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops); FS.mkdev("/dev/tty", FS.makedev(5, 0)); FS.mkdev("/dev/tty1", FS.makedev(6, 0)); var randomBuffer = new Uint8Array(1024), randomLeft = 0; var randomByte = () => { if (randomLeft === 0) {
                randomLeft = randomFill(randomBuffer).byteLength;
            } return randomBuffer[--randomLeft]; }; FS.createDevice("/dev", "random", randomByte); FS.createDevice("/dev", "urandom", randomByte); FS.mkdir("/dev/shm"); FS.mkdir("/dev/shm/tmp"); }, createSpecialDirectories: () => { FS.mkdir("/proc"); var proc_self = FS.mkdir("/proc/self"); FS.mkdir("/proc/self/fd"); FS.mount({ mount: () => { var node = FS.createNode(proc_self, "fd", 16384 | 511, 73); node.node_ops = { lookup: (parent, name) => { var fd = +name; var stream = FS.getStream(fd); if (!stream)
                        throw new FS.ErrnoError(8); var ret = { parent: null, mount: { mountpoint: "fake" }, node_ops: { readlink: () => stream.path } }; ret.parent = ret; return ret; } }; return node; } }, {}, "/proc/self/fd"); }, createStandardStreams: () => { if (Module["stdin"]) {
                FS.createDevice("/dev", "stdin", Module["stdin"]);
            }
            else {
                FS.symlink("/dev/tty", "/dev/stdin");
            } if (Module["stdout"]) {
                FS.createDevice("/dev", "stdout", null, Module["stdout"]);
            }
            else {
                FS.symlink("/dev/tty", "/dev/stdout");
            } if (Module["stderr"]) {
                FS.createDevice("/dev", "stderr", null, Module["stderr"]);
            }
            else {
                FS.symlink("/dev/tty1", "/dev/stderr");
            } var stdin = FS.open("/dev/stdin", 0); var stdout = FS.open("/dev/stdout", 1); var stderr = FS.open("/dev/stderr", 1); }, ensureErrnoError: () => { if (FS.ErrnoError)
                return; FS.ErrnoError = function ErrnoError(errno, node) { this.name = "ErrnoError"; this.node = node; this.setErrno = function (errno) { this.errno = errno; }; this.setErrno(errno); this.message = "FS error"; }; FS.ErrnoError.prototype = new Error; FS.ErrnoError.prototype.constructor = FS.ErrnoError; [44].forEach(code => { FS.genericErrors[code] = new FS.ErrnoError(code); FS.genericErrors[code].stack = "<generic error, no stack>"; }); }, staticInit: () => { FS.ensureErrnoError(); FS.nameTable = new Array(4096); FS.mount(MEMFS, {}, "/"); FS.createDefaultDirectories(); FS.createDefaultDevices(); FS.createSpecialDirectories(); FS.filesystems = { "MEMFS": MEMFS }; }, init: (input, output, error) => { FS.init.initialized = true; FS.ensureErrnoError(); Module["stdin"] = input || Module["stdin"]; Module["stdout"] = output || Module["stdout"]; Module["stderr"] = error || Module["stderr"]; FS.createStandardStreams(); }, quit: () => { FS.init.initialized = false; for (var i = 0; i < FS.streams.length; i++) {
                var stream = FS.streams[i];
                if (!stream) {
                    continue;
                }
                FS.close(stream);
            } }, getMode: (canRead, canWrite) => { var mode = 0; if (canRead)
                mode |= 292 | 73; if (canWrite)
                mode |= 146; return mode; }, findObject: (path, dontResolveLastLink) => { var ret = FS.analyzePath(path, dontResolveLastLink); if (!ret.exists) {
                return null;
            } return ret.object; }, analyzePath: (path, dontResolveLastLink) => { try {
                var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
                path = lookup.path;
            }
            catch (e) { } var ret = { isRoot: false, exists: false, error: 0, name: null, path: null, object: null, parentExists: false, parentPath: null, parentObject: null }; try {
                var lookup = FS.lookupPath(path, { parent: true });
                ret.parentExists = true;
                ret.parentPath = lookup.path;
                ret.parentObject = lookup.node;
                ret.name = PATH.basename(path);
                lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
                ret.exists = true;
                ret.path = lookup.path;
                ret.object = lookup.node;
                ret.name = lookup.node.name;
                ret.isRoot = lookup.path === "/";
            }
            catch (e) {
                ret.error = e.errno;
            } return ret; }, createPath: (parent, path, canRead, canWrite) => { parent = typeof parent == "string" ? parent : FS.getPath(parent); var parts = path.split("/").reverse(); while (parts.length) {
                var part = parts.pop();
                if (!part)
                    continue;
                var current = PATH.join2(parent, part);
                try {
                    FS.mkdir(current);
                }
                catch (e) { }
                parent = current;
            } return current; }, createFile: (parent, name, properties, canRead, canWrite) => { var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name); var mode = FS.getMode(canRead, canWrite); return FS.create(path, mode); }, createDataFile: (parent, name, data, canRead, canWrite, canOwn) => { var path = name; if (parent) {
                parent = typeof parent == "string" ? parent : FS.getPath(parent);
                path = name ? PATH.join2(parent, name) : parent;
            } var mode = FS.getMode(canRead, canWrite); var node = FS.create(path, mode); if (data) {
                if (typeof data == "string") {
                    var arr = new Array(data.length);
                    for (var i = 0, len = data.length; i < len; ++i)
                        arr[i] = data.charCodeAt(i);
                    data = arr;
                }
                FS.chmod(node, mode | 146);
                var stream = FS.open(node, 577);
                FS.write(stream, data, 0, data.length, 0, canOwn);
                FS.close(stream);
                FS.chmod(node, mode);
            } return node; }, createDevice: (parent, name, input, output) => { var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name); var mode = FS.getMode(!!input, !!output); if (!FS.createDevice.major)
                FS.createDevice.major = 64; var dev = FS.makedev(FS.createDevice.major++, 0); FS.registerDevice(dev, { open: stream => { stream.seekable = false; }, close: stream => { if (output && output.buffer && output.buffer.length) {
                    output(10);
                } }, read: (stream, buffer, offset, length, pos) => { var bytesRead = 0; for (var i = 0; i < length; i++) {
                    var result;
                    try {
                        result = input();
                    }
                    catch (e) {
                        throw new FS.ErrnoError(29);
                    }
                    if (result === undefined && bytesRead === 0) {
                        throw new FS.ErrnoError(6);
                    }
                    if (result === null || result === undefined)
                        break;
                    bytesRead++;
                    buffer[offset + i] = result;
                } if (bytesRead) {
                    stream.node.timestamp = Date.now();
                } return bytesRead; }, write: (stream, buffer, offset, length, pos) => { for (var i = 0; i < length; i++) {
                    try {
                        output(buffer[offset + i]);
                    }
                    catch (e) {
                        throw new FS.ErrnoError(29);
                    }
                } if (length) {
                    stream.node.timestamp = Date.now();
                } return i; } }); return FS.mkdev(path, mode, dev); }, forceLoadFile: obj => { if (obj.isDevice || obj.isFolder || obj.link || obj.contents)
                return true; if (typeof XMLHttpRequest != "undefined") {
                throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
            }
            else if (read_) {
                try {
                    obj.contents = intArrayFromString(read_(obj.url), true);
                    obj.usedBytes = obj.contents.length;
                }
                catch (e) {
                    throw new FS.ErrnoError(29);
                }
            }
            else {
                throw new Error("Cannot load without read() or XMLHttpRequest.");
            } }, createLazyFile: (parent, name, url, canRead, canWrite) => { function LazyUint8Array() { this.lengthKnown = false; this.chunks = []; } LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) { if (idx > this.length - 1 || idx < 0) {
                return undefined;
            } var chunkOffset = idx % this.chunkSize; var chunkNum = idx / this.chunkSize | 0; return this.getter(chunkNum)[chunkOffset]; }; LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) { this.getter = getter; }; LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() { var xhr = new XMLHttpRequest; xhr.open("HEAD", url, false); xhr.send(null); if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304))
                throw new Error("Couldn't load " + url + ". Status: " + xhr.status); var datalength = Number(xhr.getResponseHeader("Content-length")); var header; var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes"; var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip"; var chunkSize = 1024 * 1024; if (!hasByteServing)
                chunkSize = datalength; var doXHR = (from, to) => { if (from > to)
                throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!"); if (to > datalength - 1)
                throw new Error("only " + datalength + " bytes available! programmer error!"); var xhr = new XMLHttpRequest; xhr.open("GET", url, false); if (datalength !== chunkSize)
                xhr.setRequestHeader("Range", "bytes=" + from + "-" + to); xhr.responseType = "arraybuffer"; if (xhr.overrideMimeType) {
                xhr.overrideMimeType("text/plain; charset=x-user-defined");
            } xhr.send(null); if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304))
                throw new Error("Couldn't load " + url + ". Status: " + xhr.status); if (xhr.response !== undefined) {
                return new Uint8Array(xhr.response || []);
            } return intArrayFromString(xhr.responseText || "", true); }; var lazyArray = this; lazyArray.setDataGetter(chunkNum => { var start = chunkNum * chunkSize; var end = (chunkNum + 1) * chunkSize - 1; end = Math.min(end, datalength - 1); if (typeof lazyArray.chunks[chunkNum] == "undefined") {
                lazyArray.chunks[chunkNum] = doXHR(start, end);
            } if (typeof lazyArray.chunks[chunkNum] == "undefined")
                throw new Error("doXHR failed!"); return lazyArray.chunks[chunkNum]; }); if (usesGzip || !datalength) {
                chunkSize = datalength = 1;
                datalength = this.getter(0).length;
                chunkSize = datalength;
                out("LazyFiles on gzip forces download of the whole file when length is accessed");
            } this._length = datalength; this._chunkSize = chunkSize; this.lengthKnown = true; }; if (typeof XMLHttpRequest != "undefined") {
                if (!ENVIRONMENT_IS_WORKER)
                    throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
                var lazyArray = new LazyUint8Array;
                Object.defineProperties(lazyArray, { length: { get: function () { if (!this.lengthKnown) {
                            this.cacheLength();
                        } return this._length; } }, chunkSize: { get: function () { if (!this.lengthKnown) {
                            this.cacheLength();
                        } return this._chunkSize; } } });
                var properties = { isDevice: false, contents: lazyArray };
            }
            else {
                var properties = { isDevice: false, url: url };
            } var node = FS.createFile(parent, name, properties, canRead, canWrite); if (properties.contents) {
                node.contents = properties.contents;
            }
            else if (properties.url) {
                node.contents = null;
                node.url = properties.url;
            } Object.defineProperties(node, { usedBytes: { get: function () { return this.contents.length; } } }); var stream_ops = {}; var keys = Object.keys(node.stream_ops); keys.forEach(key => { var fn = node.stream_ops[key]; stream_ops[key] = function forceLoadLazyFile() { FS.forceLoadFile(node); return fn.apply(null, arguments); }; }); function writeChunks(stream, buffer, offset, length, position) { var contents = stream.node.contents; if (position >= contents.length)
                return 0; var size = Math.min(contents.length - position, length); if (contents.slice) {
                for (var i = 0; i < size; i++) {
                    buffer[offset + i] = contents[position + i];
                }
            }
            else {
                for (var i = 0; i < size; i++) {
                    buffer[offset + i] = contents.get(position + i);
                }
            } return size; } stream_ops.read = (stream, buffer, offset, length, position) => { FS.forceLoadFile(node); return writeChunks(stream, buffer, offset, length, position); }; stream_ops.mmap = (stream, length, position, prot, flags) => { FS.forceLoadFile(node); var ptr = mmapAlloc(length); if (!ptr) {
                throw new FS.ErrnoError(48);
            } writeChunks(stream, HEAP8, ptr, length, position); return { ptr: ptr, allocated: true }; }; node.stream_ops = stream_ops; return node; }, createPreloadedFile: (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => { var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent; var dep = getUniqueRunDependency("cp " + fullname); function processData(byteArray) { function finish(byteArray) { if (preFinish)
                preFinish(); if (!dontCreateFile) {
                FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
            } if (onload)
                onload(); removeRunDependency(dep); } if (Browser.handledByPreloadPlugin(byteArray, fullname, finish, () => { if (onerror)
                onerror(); removeRunDependency(dep); })) {
                return;
            } finish(byteArray); } addRunDependency(dep); if (typeof url == "string") {
                asyncLoad(url, byteArray => processData(byteArray), onerror);
            }
            else {
                processData(url);
            } } };
        var SYSCALLS = { DEFAULT_POLLMASK: 5, calculateAt: function (dirfd, path, allowEmpty) { if (PATH.isAbs(path)) {
                return path;
            } var dir; if (dirfd === -100) {
                dir = FS.cwd();
            }
            else {
                var dirstream = SYSCALLS.getStreamFromFD(dirfd);
                dir = dirstream.path;
            } if (path.length == 0) {
                if (!allowEmpty) {
                    throw new FS.ErrnoError(44);
                }
                return dir;
            } return PATH.join2(dir, path); }, doStat: function (func, path, buf) { try {
                var stat = func(path);
            }
            catch (e) {
                if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
                    return -54;
                }
                throw e;
            } HEAP32[buf >> 2] = stat.dev; HEAP32[buf + 8 >> 2] = stat.ino; HEAP32[buf + 12 >> 2] = stat.mode; HEAPU32[buf + 16 >> 2] = stat.nlink; HEAP32[buf + 20 >> 2] = stat.uid; HEAP32[buf + 24 >> 2] = stat.gid; HEAP32[buf + 28 >> 2] = stat.rdev; tempI64 = [stat.size >>> 0, (tempDouble = stat.size, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 40 >> 2] = tempI64[0], HEAP32[buf + 44 >> 2] = tempI64[1]; HEAP32[buf + 48 >> 2] = 4096; HEAP32[buf + 52 >> 2] = stat.blocks; var atime = stat.atime.getTime(); var mtime = stat.mtime.getTime(); var ctime = stat.ctime.getTime(); tempI64 = [Math.floor(atime / 1e3) >>> 0, (tempDouble = Math.floor(atime / 1e3), +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 56 >> 2] = tempI64[0], HEAP32[buf + 60 >> 2] = tempI64[1]; HEAPU32[buf + 64 >> 2] = atime % 1e3 * 1e3; tempI64 = [Math.floor(mtime / 1e3) >>> 0, (tempDouble = Math.floor(mtime / 1e3), +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 72 >> 2] = tempI64[0], HEAP32[buf + 76 >> 2] = tempI64[1]; HEAPU32[buf + 80 >> 2] = mtime % 1e3 * 1e3; tempI64 = [Math.floor(ctime / 1e3) >>> 0, (tempDouble = Math.floor(ctime / 1e3), +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 88 >> 2] = tempI64[0], HEAP32[buf + 92 >> 2] = tempI64[1]; HEAPU32[buf + 96 >> 2] = ctime % 1e3 * 1e3; tempI64 = [stat.ino >>> 0, (tempDouble = stat.ino, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 104 >> 2] = tempI64[0], HEAP32[buf + 108 >> 2] = tempI64[1]; return 0; }, doMsync: function (addr, stream, len, flags, offset) { if (!FS.isFile(stream.node.mode)) {
                throw new FS.ErrnoError(43);
            } if (flags & 2) {
                return 0;
            } var buffer = HEAPU8.slice(addr, addr + len); FS.msync(stream, buffer, offset, len, flags); }, varargs: undefined, get: function () { SYSCALLS.varargs += 4; var ret = HEAP32[SYSCALLS.varargs - 4 >> 2]; return ret; }, getStr: function (ptr) { var ret = UTF8ToString(ptr); return ret; }, getStreamFromFD: function (fd) { var stream = FS.getStream(fd); if (!stream)
                throw new FS.ErrnoError(8); return stream; } };
        function ___syscall_fstat64(fd, buf) { try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            return SYSCALLS.doStat(FS.stat, stream.path, buf);
        }
        catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
                throw e;
            return -e.errno;
        } }
        function ___syscall_newfstatat(dirfd, path, buf, flags) { try {
            path = SYSCALLS.getStr(path);
            var nofollow = flags & 256;
            var allowEmpty = flags & 4096;
            flags = flags & ~6400;
            path = SYSCALLS.calculateAt(dirfd, path, allowEmpty);
            return SYSCALLS.doStat(nofollow ? FS.lstat : FS.stat, path, buf);
        }
        catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
                throw e;
            return -e.errno;
        } }
        function ___syscall_openat(dirfd, path, flags, varargs) { SYSCALLS.varargs = varargs; try {
            path = SYSCALLS.getStr(path);
            path = SYSCALLS.calculateAt(dirfd, path);
            var mode = varargs ? SYSCALLS.get() : 0;
            return FS.open(path, flags, mode).fd;
        }
        catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
                throw e;
            return -e.errno;
        } }
        function ___syscall_stat64(path, buf) { try {
            path = SYSCALLS.getStr(path);
            return SYSCALLS.doStat(FS.stat, path, buf);
        }
        catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
                throw e;
            return -e.errno;
        } }
        function _emscripten_memcpy_big(dest, src, num) { HEAPU8.copyWithin(dest, src, src + num); }
        function abortOnCannotGrowMemory(requestedSize) { abort("OOM"); }
        function _emscripten_resize_heap(requestedSize) { var oldSize = HEAPU8.length; requestedSize = requestedSize >>> 0; abortOnCannotGrowMemory(requestedSize); }
        function _proc_exit(code) { EXITSTATUS = code; if (!keepRuntimeAlive()) {
            if (Module["onExit"])
                Module["onExit"](code);
            ABORT = true;
        } quit_(code, new ExitStatus(code)); }
        function exitJS(status, implicit) { EXITSTATUS = status; _proc_exit(status); }
        var _exit = exitJS;
        function _fd_close(fd) { try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            FS.close(stream);
            return 0;
        }
        catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
                throw e;
            return e.errno;
        } }
        function doReadv(stream, iov, iovcnt, offset) { var ret = 0; for (var i = 0; i < iovcnt; i++) {
            var ptr = HEAPU32[iov >> 2];
            var len = HEAPU32[iov + 4 >> 2];
            iov += 8;
            var curr = FS.read(stream, HEAP8, ptr, len, offset);
            if (curr < 0)
                return -1;
            ret += curr;
            if (curr < len)
                break;
            if (typeof offset !== "undefined") {
                offset += curr;
            }
        } return ret; }
        function _fd_read(fd, iov, iovcnt, pnum) { try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            var num = doReadv(stream, iov, iovcnt);
            HEAPU32[pnum >> 2] = num;
            return 0;
        }
        catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
                throw e;
            return e.errno;
        } }
        function convertI32PairToI53Checked(lo, hi) { return hi + 2097152 >>> 0 < 4194305 - !!lo ? (lo >>> 0) + hi * 4294967296 : NaN; }
        function _fd_seek(fd, offset_low, offset_high, whence, newOffset) { try {
            var offset = convertI32PairToI53Checked(offset_low, offset_high);
            if (isNaN(offset))
                return 61;
            var stream = SYSCALLS.getStreamFromFD(fd);
            FS.llseek(stream, offset, whence);
            tempI64 = [stream.position >>> 0, (tempDouble = stream.position, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[newOffset >> 2] = tempI64[0], HEAP32[newOffset + 4 >> 2] = tempI64[1];
            if (stream.getdents && offset === 0 && whence === 0)
                stream.getdents = null;
            return 0;
        }
        catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
                throw e;
            return e.errno;
        } }
        function doWritev(stream, iov, iovcnt, offset) { var ret = 0; for (var i = 0; i < iovcnt; i++) {
            var ptr = HEAPU32[iov >> 2];
            var len = HEAPU32[iov + 4 >> 2];
            iov += 8;
            var curr = FS.write(stream, HEAP8, ptr, len, offset);
            if (curr < 0)
                return -1;
            ret += curr;
            if (typeof offset !== "undefined") {
                offset += curr;
            }
        } return ret; }
        function _fd_write(fd, iov, iovcnt, pnum) { try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            var num = doWritev(stream, iov, iovcnt);
            HEAPU32[pnum >> 2] = num;
            return 0;
        }
        catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
                throw e;
            return e.errno;
        } }
        function handleException(e) { if (e instanceof ExitStatus || e == "unwind") {
            return EXITSTATUS;
        } quit_(1, e); }
        function stringToUTF8(str, outPtr, maxBytesToWrite) { return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite); }
        function stringToUTF8OnStack(str) { var size = lengthBytesUTF8(str) + 1; var ret = stackAlloc(size); stringToUTF8(str, ret, size); return ret; }
        var FSNode = function (parent, name, mode, rdev) { if (!parent) {
            parent = this;
        } this.parent = parent; this.mount = parent.mount; this.mounted = null; this.id = FS.nextInode++; this.name = name; this.mode = mode; this.node_ops = {}; this.stream_ops = {}; this.rdev = rdev; };
        var readMode = 292 | 73;
        var writeMode = 146;
        Object.defineProperties(FSNode.prototype, { read: { get: function () { return (this.mode & readMode) === readMode; }, set: function (val) { val ? this.mode |= readMode : this.mode &= ~readMode; } }, write: { get: function () { return (this.mode & writeMode) === writeMode; }, set: function (val) { val ? this.mode |= writeMode : this.mode &= ~writeMode; } }, isFolder: { get: function () { return FS.isDir(this.mode); } }, isDevice: { get: function () { return FS.isChrdev(this.mode); } } });
        FS.FSNode = FSNode;
        FS.staticInit();
        var wasmImports = { "a": ___assert_fail, "i": ___syscall_fstat64, "g": ___syscall_newfstatat, "f": ___syscall_openat, "h": ___syscall_stat64, "j": _emscripten_memcpy_big, "l": _emscripten_resize_heap, "c": _exit, "d": _fd_close, "e": _fd_read, "k": _fd_seek, "b": _fd_write };
        var asm = createWasm();
        var ___wasm_call_ctors = function () { return (___wasm_call_ctors = Module["asm"]["n"]).apply(null, arguments); };
        var _main = Module["_main"] = function () { return (_main = Module["_main"] = Module["asm"]["o"]).apply(null, arguments); };
        var ___errno_location = function () { return (___errno_location = Module["asm"]["__errno_location"]).apply(null, arguments); };
        var stackAlloc = function () { return (stackAlloc = Module["asm"]["q"]).apply(null, arguments); };
        Module["FS"] = FS;
        var calledRun;
        dependenciesFulfilled = function runCaller() { if (!calledRun)
            run(); if (!calledRun)
            dependenciesFulfilled = runCaller; };
        function callMain(args = []) { var entryFunction = _main; args.unshift(thisProgram); var argc = args.length; var argv = stackAlloc((argc + 1) * 4); var argv_ptr = argv >> 2; args.forEach(arg => { HEAP32[argv_ptr++] = stringToUTF8OnStack(arg); }); HEAP32[argv_ptr] = 0; try {
            var ret = entryFunction(argc, argv);
            exitJS(ret, true);
            return ret;
        }
        catch (e) {
            return handleException(e);
        } }
        function run(args = arguments_) { if (runDependencies > 0) {
            return;
        } preRun(); if (runDependencies > 0) {
            return;
        } function doRun() { if (calledRun)
            return; calledRun = true; Module["calledRun"] = true; if (ABORT)
            return; initRuntime(); preMain(); readyPromiseResolve(Module); if (Module["onRuntimeInitialized"])
            Module["onRuntimeInitialized"](); if (shouldRunNow)
            callMain(args); postRun(); } if (Module["setStatus"]) {
            Module["setStatus"]("Running...");
            setTimeout(function () { setTimeout(function () { Module["setStatus"](""); }, 1); doRun(); }, 1);
        }
        else {
            doRun();
        } }
        if (Module["preInit"]) {
            if (typeof Module["preInit"] == "function")
                Module["preInit"] = [Module["preInit"]];
            while (Module["preInit"].length > 0) {
                Module["preInit"].pop()();
            }
        }
        var shouldRunNow = true;
        if (Module["noInitialRun"])
            shouldRunNow = false;
        run();
        return createRgbFix.ready;
    });
})();
exports["default"] = createRgbFix;


/***/ }),

/***/ 3108:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var createRgbLink = (() => {
    var _scriptDir = "file:///D:/Emulators/New%20folder/gb-studio-develop/gb-studio-develop/appData/wasm/rgbds/rgblink.js";
    return (function (createRgbLink = {}) {
        var Module = typeof createRgbLink != "undefined" ? createRgbLink : {};
        var readyPromiseResolve, readyPromiseReject;
        Module["ready"] = new Promise((resolve, reject) => { readyPromiseResolve = resolve; readyPromiseReject = reject; });
        var moduleOverrides = Object.assign({}, Module);
        var arguments_ = [];
        var thisProgram = "./this.program";
        var quit_ = (status, toThrow) => { throw toThrow; };
        var ENVIRONMENT_IS_WEB = true;
        var ENVIRONMENT_IS_WORKER = false;
        var scriptDirectory = "";
        function locateFile(path) { if (Module["locateFile"]) {
            return Module["locateFile"](path, scriptDirectory);
        } return scriptDirectory + path; }
        var read_, readAsync, readBinary, setWindowTitle;
        if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
            if (ENVIRONMENT_IS_WORKER) {
                scriptDirectory = self.location.href;
            }
            else if (typeof document != "undefined" && document.currentScript) {
                scriptDirectory = document.currentScript.src;
            }
            if (_scriptDir) {
                scriptDirectory = _scriptDir;
            }
            if (scriptDirectory.indexOf("blob:") !== 0) {
                scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1);
            }
            else {
                scriptDirectory = "";
            }
            {
                read_ = url => { var xhr = new XMLHttpRequest; xhr.open("GET", url, false); xhr.send(null); return xhr.responseText; };
                if (ENVIRONMENT_IS_WORKER) {
                    readBinary = url => { var xhr = new XMLHttpRequest; xhr.open("GET", url, false); xhr.responseType = "arraybuffer"; xhr.send(null); return new Uint8Array(xhr.response); };
                }
                readAsync = (url, onload, onerror) => { var xhr = new XMLHttpRequest; xhr.open("GET", url, true); xhr.responseType = "arraybuffer"; xhr.onload = () => { if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                    onload(xhr.response);
                    return;
                } onerror(); }; xhr.onerror = onerror; xhr.send(null); };
            }
            setWindowTitle = title => document.title = title;
        }
        else { }
        var out = Module["print"] || console.log.bind(console);
        var err = Module["printErr"] || console.warn.bind(console);
        Object.assign(Module, moduleOverrides);
        moduleOverrides = null;
        if (Module["arguments"])
            arguments_ = Module["arguments"];
        if (Module["thisProgram"])
            thisProgram = Module["thisProgram"];
        if (Module["quit"])
            quit_ = Module["quit"];
        var wasmBinary;
        if (Module["wasmBinary"])
            wasmBinary = Module["wasmBinary"];
        var noExitRuntime = Module["noExitRuntime"] || true;
        if (typeof WebAssembly != "object") {
            abort("no native wasm support detected");
        }
        var wasmMemory;
        var ABORT = false;
        var EXITSTATUS;
        function assert(condition, text) { if (!condition) {
            abort(text);
        } }
        var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
        function updateMemoryViews() { var b = wasmMemory.buffer; Module["HEAP8"] = HEAP8 = new Int8Array(b); Module["HEAP16"] = HEAP16 = new Int16Array(b); Module["HEAP32"] = HEAP32 = new Int32Array(b); Module["HEAPU8"] = HEAPU8 = new Uint8Array(b); Module["HEAPU16"] = HEAPU16 = new Uint16Array(b); Module["HEAPU32"] = HEAPU32 = new Uint32Array(b); Module["HEAPF32"] = HEAPF32 = new Float32Array(b); Module["HEAPF64"] = HEAPF64 = new Float64Array(b); }
        var wasmTable;
        var __ATPRERUN__ = [];
        var __ATINIT__ = [];
        var __ATMAIN__ = [];
        var __ATPOSTRUN__ = [];
        var runtimeInitialized = false;
        var runtimeKeepaliveCounter = 0;
        function keepRuntimeAlive() { return noExitRuntime || runtimeKeepaliveCounter > 0; }
        function preRun() { if (Module["preRun"]) {
            if (typeof Module["preRun"] == "function")
                Module["preRun"] = [Module["preRun"]];
            while (Module["preRun"].length) {
                addOnPreRun(Module["preRun"].shift());
            }
        } callRuntimeCallbacks(__ATPRERUN__); }
        function initRuntime() { runtimeInitialized = true; if (!Module["noFSInit"] && !FS.init.initialized)
            FS.init(); FS.ignorePermissions = false; TTY.init(); callRuntimeCallbacks(__ATINIT__); }
        function preMain() { callRuntimeCallbacks(__ATMAIN__); }
        function postRun() { if (Module["postRun"]) {
            if (typeof Module["postRun"] == "function")
                Module["postRun"] = [Module["postRun"]];
            while (Module["postRun"].length) {
                addOnPostRun(Module["postRun"].shift());
            }
        } callRuntimeCallbacks(__ATPOSTRUN__); }
        function addOnPreRun(cb) { __ATPRERUN__.unshift(cb); }
        function addOnInit(cb) { __ATINIT__.unshift(cb); }
        function addOnPostRun(cb) { __ATPOSTRUN__.unshift(cb); }
        var runDependencies = 0;
        var runDependencyWatcher = null;
        var dependenciesFulfilled = null;
        function getUniqueRunDependency(id) { return id; }
        function addRunDependency(id) { runDependencies++; if (Module["monitorRunDependencies"]) {
            Module["monitorRunDependencies"](runDependencies);
        } }
        function removeRunDependency(id) { runDependencies--; if (Module["monitorRunDependencies"]) {
            Module["monitorRunDependencies"](runDependencies);
        } if (runDependencies == 0) {
            if (runDependencyWatcher !== null) {
                clearInterval(runDependencyWatcher);
                runDependencyWatcher = null;
            }
            if (dependenciesFulfilled) {
                var callback = dependenciesFulfilled;
                dependenciesFulfilled = null;
                callback();
            }
        } }
        function abort(what) { if (Module["onAbort"]) {
            Module["onAbort"](what);
        } what = "Aborted(" + what + ")"; err(what); ABORT = true; EXITSTATUS = 1; what += ". Build with -sASSERTIONS for more info."; var e = new WebAssembly.RuntimeError(what); readyPromiseReject(e); throw e; }
        var dataURIPrefix = "data:application/octet-stream;base64,";
        function isDataURI(filename) { return filename.startsWith(dataURIPrefix); }
        var wasmBinaryFile;
        if (Module["locateFile"]) {
            wasmBinaryFile = "rgblink.wasm";
            if (!isDataURI(wasmBinaryFile)) {
                wasmBinaryFile = locateFile(wasmBinaryFile);
            }
        }
        else {
            wasmBinaryFile = new URL(/* asset import */ __webpack_require__(21670), __webpack_require__.b).href;
        }
        function getBinary(file) { try {
            if (file == wasmBinaryFile && wasmBinary) {
                return new Uint8Array(wasmBinary);
            }
            if (readBinary) {
                return readBinary(file);
            }
            throw "both async and sync fetching of the wasm failed";
        }
        catch (err) {
            abort(err);
        } }
        function getBinaryPromise(binaryFile) { if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
            if (typeof fetch == "function") {
                return fetch(binaryFile, { credentials: "same-origin" }).then(response => { if (!response["ok"]) {
                    throw "failed to load wasm binary file at '" + binaryFile + "'";
                } return response["arrayBuffer"](); }).catch(() => getBinary(binaryFile));
            }
        } return Promise.resolve().then(() => getBinary(binaryFile)); }
        function instantiateArrayBuffer(binaryFile, imports, receiver) { return getBinaryPromise(binaryFile).then(binary => { return WebAssembly.instantiate(binary, imports); }).then(instance => { return instance; }).then(receiver, reason => { err("failed to asynchronously prepare wasm: " + reason); abort(reason); }); }
        function instantiateAsync(binary, binaryFile, imports, callback) { if (!binary && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(binaryFile) && typeof fetch == "function") {
            return fetch(binaryFile, { credentials: "same-origin" }).then(response => { var result = WebAssembly.instantiateStreaming(response, imports); return result.then(callback, function (reason) { err("wasm streaming compile failed: " + reason); err("falling back to ArrayBuffer instantiation"); return instantiateArrayBuffer(binaryFile, imports, callback); }); });
        }
        else {
            return instantiateArrayBuffer(binaryFile, imports, callback);
        } }
        function createWasm() { var info = { "a": wasmImports }; function receiveInstance(instance, module) { var exports = instance.exports; Module["asm"] = exports; wasmMemory = Module["asm"]["l"]; updateMemoryViews(); wasmTable = Module["asm"]["n"]; addOnInit(Module["asm"]["m"]); removeRunDependency("wasm-instantiate"); return exports; } addRunDependency("wasm-instantiate"); function receiveInstantiationResult(result) { receiveInstance(result["instance"]); } if (Module["instantiateWasm"]) {
            try {
                return Module["instantiateWasm"](info, receiveInstance);
            }
            catch (e) {
                err("Module.instantiateWasm callback failed with error: " + e);
                readyPromiseReject(e);
            }
        } instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult).catch(readyPromiseReject); return {}; }
        var tempDouble;
        var tempI64;
        function ExitStatus(status) { this.name = "ExitStatus"; this.message = "Program terminated with exit(" + status + ")"; this.status = status; }
        function callRuntimeCallbacks(callbacks) { while (callbacks.length > 0) {
            callbacks.shift()(Module);
        } }
        var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : undefined;
        function UTF8ArrayToString(heapOrArray, idx, maxBytesToRead) { var endIdx = idx + maxBytesToRead; var endPtr = idx; while (heapOrArray[endPtr] && !(endPtr >= endIdx))
            ++endPtr; if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
            return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
        } var str = ""; while (idx < endPtr) {
            var u0 = heapOrArray[idx++];
            if (!(u0 & 128)) {
                str += String.fromCharCode(u0);
                continue;
            }
            var u1 = heapOrArray[idx++] & 63;
            if ((u0 & 224) == 192) {
                str += String.fromCharCode((u0 & 31) << 6 | u1);
                continue;
            }
            var u2 = heapOrArray[idx++] & 63;
            if ((u0 & 240) == 224) {
                u0 = (u0 & 15) << 12 | u1 << 6 | u2;
            }
            else {
                u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
            }
            if (u0 < 65536) {
                str += String.fromCharCode(u0);
            }
            else {
                var ch = u0 - 65536;
                str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
            }
        } return str; }
        function UTF8ToString(ptr, maxBytesToRead) { return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : ""; }
        function ___assert_fail(condition, filename, line, func) { abort("Assertion failed: " + UTF8ToString(condition) + ", at: " + [filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function"]); }
        function setErrNo(value) { HEAP32[___errno_location() >> 2] = value; return value; }
        var PATH = { isAbs: path => path.charAt(0) === "/", splitPath: filename => { var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/; return splitPathRe.exec(filename).slice(1); }, normalizeArray: (parts, allowAboveRoot) => { var up = 0; for (var i = parts.length - 1; i >= 0; i--) {
                var last = parts[i];
                if (last === ".") {
                    parts.splice(i, 1);
                }
                else if (last === "..") {
                    parts.splice(i, 1);
                    up++;
                }
                else if (up) {
                    parts.splice(i, 1);
                    up--;
                }
            } if (allowAboveRoot) {
                for (; up; up--) {
                    parts.unshift("..");
                }
            } return parts; }, normalize: path => { var isAbsolute = PATH.isAbs(path), trailingSlash = path.substr(-1) === "/"; path = PATH.normalizeArray(path.split("/").filter(p => !!p), !isAbsolute).join("/"); if (!path && !isAbsolute) {
                path = ".";
            } if (path && trailingSlash) {
                path += "/";
            } return (isAbsolute ? "/" : "") + path; }, dirname: path => { var result = PATH.splitPath(path), root = result[0], dir = result[1]; if (!root && !dir) {
                return ".";
            } if (dir) {
                dir = dir.substr(0, dir.length - 1);
            } return root + dir; }, basename: path => { if (path === "/")
                return "/"; path = PATH.normalize(path); path = path.replace(/\/$/, ""); var lastSlash = path.lastIndexOf("/"); if (lastSlash === -1)
                return path; return path.substr(lastSlash + 1); }, join: function () { var paths = Array.prototype.slice.call(arguments); return PATH.normalize(paths.join("/")); }, join2: (l, r) => { return PATH.normalize(l + "/" + r); } };
        function initRandomFill() { if (typeof crypto == "object" && typeof crypto["getRandomValues"] == "function") {
            return view => crypto.getRandomValues(view);
        }
        else
            abort("initRandomDevice"); }
        function randomFill(view) { return (randomFill = initRandomFill())(view); }
        var PATH_FS = { resolve: function () { var resolvedPath = "", resolvedAbsolute = false; for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
                var path = i >= 0 ? arguments[i] : FS.cwd();
                if (typeof path != "string") {
                    throw new TypeError("Arguments to path.resolve must be strings");
                }
                else if (!path) {
                    return "";
                }
                resolvedPath = path + "/" + resolvedPath;
                resolvedAbsolute = PATH.isAbs(path);
            } resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter(p => !!p), !resolvedAbsolute).join("/"); return (resolvedAbsolute ? "/" : "") + resolvedPath || "."; }, relative: (from, to) => { from = PATH_FS.resolve(from).substr(1); to = PATH_FS.resolve(to).substr(1); function trim(arr) { var start = 0; for (; start < arr.length; start++) {
                if (arr[start] !== "")
                    break;
            } var end = arr.length - 1; for (; end >= 0; end--) {
                if (arr[end] !== "")
                    break;
            } if (start > end)
                return []; return arr.slice(start, end - start + 1); } var fromParts = trim(from.split("/")); var toParts = trim(to.split("/")); var length = Math.min(fromParts.length, toParts.length); var samePartsLength = length; for (var i = 0; i < length; i++) {
                if (fromParts[i] !== toParts[i]) {
                    samePartsLength = i;
                    break;
                }
            } var outputParts = []; for (var i = samePartsLength; i < fromParts.length; i++) {
                outputParts.push("..");
            } outputParts = outputParts.concat(toParts.slice(samePartsLength)); return outputParts.join("/"); } };
        function lengthBytesUTF8(str) { var len = 0; for (var i = 0; i < str.length; ++i) {
            var c = str.charCodeAt(i);
            if (c <= 127) {
                len++;
            }
            else if (c <= 2047) {
                len += 2;
            }
            else if (c >= 55296 && c <= 57343) {
                len += 4;
                ++i;
            }
            else {
                len += 3;
            }
        } return len; }
        function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) { if (!(maxBytesToWrite > 0))
            return 0; var startIdx = outIdx; var endIdx = outIdx + maxBytesToWrite - 1; for (var i = 0; i < str.length; ++i) {
            var u = str.charCodeAt(i);
            if (u >= 55296 && u <= 57343) {
                var u1 = str.charCodeAt(++i);
                u = 65536 + ((u & 1023) << 10) | u1 & 1023;
            }
            if (u <= 127) {
                if (outIdx >= endIdx)
                    break;
                heap[outIdx++] = u;
            }
            else if (u <= 2047) {
                if (outIdx + 1 >= endIdx)
                    break;
                heap[outIdx++] = 192 | u >> 6;
                heap[outIdx++] = 128 | u & 63;
            }
            else if (u <= 65535) {
                if (outIdx + 2 >= endIdx)
                    break;
                heap[outIdx++] = 224 | u >> 12;
                heap[outIdx++] = 128 | u >> 6 & 63;
                heap[outIdx++] = 128 | u & 63;
            }
            else {
                if (outIdx + 3 >= endIdx)
                    break;
                heap[outIdx++] = 240 | u >> 18;
                heap[outIdx++] = 128 | u >> 12 & 63;
                heap[outIdx++] = 128 | u >> 6 & 63;
                heap[outIdx++] = 128 | u & 63;
            }
        } heap[outIdx] = 0; return outIdx - startIdx; }
        function intArrayFromString(stringy, dontAddNull, length) { var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1; var u8array = new Array(len); var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length); if (dontAddNull)
            u8array.length = numBytesWritten; return u8array; }
        var TTY = { ttys: [], init: function () { }, shutdown: function () { }, register: function (dev, ops) { TTY.ttys[dev] = { input: [], output: [], ops: ops }; FS.registerDevice(dev, TTY.stream_ops); }, stream_ops: { open: function (stream) { var tty = TTY.ttys[stream.node.rdev]; if (!tty) {
                    throw new FS.ErrnoError(43);
                } stream.tty = tty; stream.seekable = false; }, close: function (stream) { stream.tty.ops.fsync(stream.tty); }, fsync: function (stream) { stream.tty.ops.fsync(stream.tty); }, read: function (stream, buffer, offset, length, pos) { if (!stream.tty || !stream.tty.ops.get_char) {
                    throw new FS.ErrnoError(60);
                } var bytesRead = 0; for (var i = 0; i < length; i++) {
                    var result;
                    try {
                        result = stream.tty.ops.get_char(stream.tty);
                    }
                    catch (e) {
                        throw new FS.ErrnoError(29);
                    }
                    if (result === undefined && bytesRead === 0) {
                        throw new FS.ErrnoError(6);
                    }
                    if (result === null || result === undefined)
                        break;
                    bytesRead++;
                    buffer[offset + i] = result;
                } if (bytesRead) {
                    stream.node.timestamp = Date.now();
                } return bytesRead; }, write: function (stream, buffer, offset, length, pos) { if (!stream.tty || !stream.tty.ops.put_char) {
                    throw new FS.ErrnoError(60);
                } try {
                    for (var i = 0; i < length; i++) {
                        stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
                    }
                }
                catch (e) {
                    throw new FS.ErrnoError(29);
                } if (length) {
                    stream.node.timestamp = Date.now();
                } return i; } }, default_tty_ops: { get_char: function (tty) { if (!tty.input.length) {
                    var result = null;
                    if (typeof window != "undefined" && typeof window.prompt == "function") {
                        result = window.prompt("Input: ");
                        if (result !== null) {
                            result += "\n";
                        }
                    }
                    else if (typeof readline == "function") {
                        result = readline();
                        if (result !== null) {
                            result += "\n";
                        }
                    }
                    if (!result) {
                        return null;
                    }
                    tty.input = intArrayFromString(result, true);
                } return tty.input.shift(); }, put_char: function (tty, val) { if (val === null || val === 10) {
                    out(UTF8ArrayToString(tty.output, 0));
                    tty.output = [];
                }
                else {
                    if (val != 0)
                        tty.output.push(val);
                } }, fsync: function (tty) { if (tty.output && tty.output.length > 0) {
                    out(UTF8ArrayToString(tty.output, 0));
                    tty.output = [];
                } } }, default_tty1_ops: { put_char: function (tty, val) { if (val === null || val === 10) {
                    err(UTF8ArrayToString(tty.output, 0));
                    tty.output = [];
                }
                else {
                    if (val != 0)
                        tty.output.push(val);
                } }, fsync: function (tty) { if (tty.output && tty.output.length > 0) {
                    err(UTF8ArrayToString(tty.output, 0));
                    tty.output = [];
                } } } };
        function mmapAlloc(size) { abort(); }
        var MEMFS = { ops_table: null, mount: function (mount) { return MEMFS.createNode(null, "/", 16384 | 511, 0); }, createNode: function (parent, name, mode, dev) { if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
                throw new FS.ErrnoError(63);
            } if (!MEMFS.ops_table) {
                MEMFS.ops_table = { dir: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, lookup: MEMFS.node_ops.lookup, mknod: MEMFS.node_ops.mknod, rename: MEMFS.node_ops.rename, unlink: MEMFS.node_ops.unlink, rmdir: MEMFS.node_ops.rmdir, readdir: MEMFS.node_ops.readdir, symlink: MEMFS.node_ops.symlink }, stream: { llseek: MEMFS.stream_ops.llseek } }, file: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr }, stream: { llseek: MEMFS.stream_ops.llseek, read: MEMFS.stream_ops.read, write: MEMFS.stream_ops.write, allocate: MEMFS.stream_ops.allocate, mmap: MEMFS.stream_ops.mmap, msync: MEMFS.stream_ops.msync } }, link: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, readlink: MEMFS.node_ops.readlink }, stream: {} }, chrdev: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr }, stream: FS.chrdev_stream_ops } };
            } var node = FS.createNode(parent, name, mode, dev); if (FS.isDir(node.mode)) {
                node.node_ops = MEMFS.ops_table.dir.node;
                node.stream_ops = MEMFS.ops_table.dir.stream;
                node.contents = {};
            }
            else if (FS.isFile(node.mode)) {
                node.node_ops = MEMFS.ops_table.file.node;
                node.stream_ops = MEMFS.ops_table.file.stream;
                node.usedBytes = 0;
                node.contents = null;
            }
            else if (FS.isLink(node.mode)) {
                node.node_ops = MEMFS.ops_table.link.node;
                node.stream_ops = MEMFS.ops_table.link.stream;
            }
            else if (FS.isChrdev(node.mode)) {
                node.node_ops = MEMFS.ops_table.chrdev.node;
                node.stream_ops = MEMFS.ops_table.chrdev.stream;
            } node.timestamp = Date.now(); if (parent) {
                parent.contents[name] = node;
                parent.timestamp = node.timestamp;
            } return node; }, getFileDataAsTypedArray: function (node) { if (!node.contents)
                return new Uint8Array(0); if (node.contents.subarray)
                return node.contents.subarray(0, node.usedBytes); return new Uint8Array(node.contents); }, expandFileStorage: function (node, newCapacity) { var prevCapacity = node.contents ? node.contents.length : 0; if (prevCapacity >= newCapacity)
                return; var CAPACITY_DOUBLING_MAX = 1024 * 1024; newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) >>> 0); if (prevCapacity != 0)
                newCapacity = Math.max(newCapacity, 256); var oldContents = node.contents; node.contents = new Uint8Array(newCapacity); if (node.usedBytes > 0)
                node.contents.set(oldContents.subarray(0, node.usedBytes), 0); }, resizeFileStorage: function (node, newSize) { if (node.usedBytes == newSize)
                return; if (newSize == 0) {
                node.contents = null;
                node.usedBytes = 0;
            }
            else {
                var oldContents = node.contents;
                node.contents = new Uint8Array(newSize);
                if (oldContents) {
                    node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
                }
                node.usedBytes = newSize;
            } }, node_ops: { getattr: function (node) { var attr = {}; attr.dev = FS.isChrdev(node.mode) ? node.id : 1; attr.ino = node.id; attr.mode = node.mode; attr.nlink = 1; attr.uid = 0; attr.gid = 0; attr.rdev = node.rdev; if (FS.isDir(node.mode)) {
                    attr.size = 4096;
                }
                else if (FS.isFile(node.mode)) {
                    attr.size = node.usedBytes;
                }
                else if (FS.isLink(node.mode)) {
                    attr.size = node.link.length;
                }
                else {
                    attr.size = 0;
                } attr.atime = new Date(node.timestamp); attr.mtime = new Date(node.timestamp); attr.ctime = new Date(node.timestamp); attr.blksize = 4096; attr.blocks = Math.ceil(attr.size / attr.blksize); return attr; }, setattr: function (node, attr) { if (attr.mode !== undefined) {
                    node.mode = attr.mode;
                } if (attr.timestamp !== undefined) {
                    node.timestamp = attr.timestamp;
                } if (attr.size !== undefined) {
                    MEMFS.resizeFileStorage(node, attr.size);
                } }, lookup: function (parent, name) { throw FS.genericErrors[44]; }, mknod: function (parent, name, mode, dev) { return MEMFS.createNode(parent, name, mode, dev); }, rename: function (old_node, new_dir, new_name) { if (FS.isDir(old_node.mode)) {
                    var new_node;
                    try {
                        new_node = FS.lookupNode(new_dir, new_name);
                    }
                    catch (e) { }
                    if (new_node) {
                        for (var i in new_node.contents) {
                            throw new FS.ErrnoError(55);
                        }
                    }
                } delete old_node.parent.contents[old_node.name]; old_node.parent.timestamp = Date.now(); old_node.name = new_name; new_dir.contents[new_name] = old_node; new_dir.timestamp = old_node.parent.timestamp; old_node.parent = new_dir; }, unlink: function (parent, name) { delete parent.contents[name]; parent.timestamp = Date.now(); }, rmdir: function (parent, name) { var node = FS.lookupNode(parent, name); for (var i in node.contents) {
                    throw new FS.ErrnoError(55);
                } delete parent.contents[name]; parent.timestamp = Date.now(); }, readdir: function (node) { var entries = [".", ".."]; for (var key in node.contents) {
                    if (!node.contents.hasOwnProperty(key)) {
                        continue;
                    }
                    entries.push(key);
                } return entries; }, symlink: function (parent, newname, oldpath) { var node = MEMFS.createNode(parent, newname, 511 | 40960, 0); node.link = oldpath; return node; }, readlink: function (node) { if (!FS.isLink(node.mode)) {
                    throw new FS.ErrnoError(28);
                } return node.link; } }, stream_ops: { read: function (stream, buffer, offset, length, position) { var contents = stream.node.contents; if (position >= stream.node.usedBytes)
                    return 0; var size = Math.min(stream.node.usedBytes - position, length); if (size > 8 && contents.subarray) {
                    buffer.set(contents.subarray(position, position + size), offset);
                }
                else {
                    for (var i = 0; i < size; i++)
                        buffer[offset + i] = contents[position + i];
                } return size; }, write: function (stream, buffer, offset, length, position, canOwn) { if (!length)
                    return 0; var node = stream.node; node.timestamp = Date.now(); if (buffer.subarray && (!node.contents || node.contents.subarray)) {
                    if (canOwn) {
                        node.contents = buffer.subarray(offset, offset + length);
                        node.usedBytes = length;
                        return length;
                    }
                    else if (node.usedBytes === 0 && position === 0) {
                        node.contents = buffer.slice(offset, offset + length);
                        node.usedBytes = length;
                        return length;
                    }
                    else if (position + length <= node.usedBytes) {
                        node.contents.set(buffer.subarray(offset, offset + length), position);
                        return length;
                    }
                } MEMFS.expandFileStorage(node, position + length); if (node.contents.subarray && buffer.subarray) {
                    node.contents.set(buffer.subarray(offset, offset + length), position);
                }
                else {
                    for (var i = 0; i < length; i++) {
                        node.contents[position + i] = buffer[offset + i];
                    }
                } node.usedBytes = Math.max(node.usedBytes, position + length); return length; }, llseek: function (stream, offset, whence) { var position = offset; if (whence === 1) {
                    position += stream.position;
                }
                else if (whence === 2) {
                    if (FS.isFile(stream.node.mode)) {
                        position += stream.node.usedBytes;
                    }
                } if (position < 0) {
                    throw new FS.ErrnoError(28);
                } return position; }, allocate: function (stream, offset, length) { MEMFS.expandFileStorage(stream.node, offset + length); stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length); }, mmap: function (stream, length, position, prot, flags) { if (!FS.isFile(stream.node.mode)) {
                    throw new FS.ErrnoError(43);
                } var ptr; var allocated; var contents = stream.node.contents; if (!(flags & 2) && contents.buffer === HEAP8.buffer) {
                    allocated = false;
                    ptr = contents.byteOffset;
                }
                else {
                    if (position > 0 || position + length < contents.length) {
                        if (contents.subarray) {
                            contents = contents.subarray(position, position + length);
                        }
                        else {
                            contents = Array.prototype.slice.call(contents, position, position + length);
                        }
                    }
                    allocated = true;
                    ptr = mmapAlloc(length);
                    if (!ptr) {
                        throw new FS.ErrnoError(48);
                    }
                    HEAP8.set(contents, ptr);
                } return { ptr: ptr, allocated: allocated }; }, msync: function (stream, buffer, offset, length, mmapFlags) { MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false); return 0; } } };
        function asyncLoad(url, onload, onerror, noRunDep) { var dep = !noRunDep ? getUniqueRunDependency("al " + url) : ""; readAsync(url, arrayBuffer => { assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).'); onload(new Uint8Array(arrayBuffer)); if (dep)
            removeRunDependency(dep); }, event => { if (onerror) {
            onerror();
        }
        else {
            throw 'Loading data file "' + url + '" failed.';
        } }); if (dep)
            addRunDependency(dep); }
        var FS = { root: null, mounts: [], devices: {}, streams: [], nextInode: 1, nameTable: null, currentPath: "/", initialized: false, ignorePermissions: true, ErrnoError: null, genericErrors: {}, filesystems: null, syncFSRequests: 0, lookupPath: (path, opts = {}) => { path = PATH_FS.resolve(path); if (!path)
                return { path: "", node: null }; var defaults = { follow_mount: true, recurse_count: 0 }; opts = Object.assign(defaults, opts); if (opts.recurse_count > 8) {
                throw new FS.ErrnoError(32);
            } var parts = path.split("/").filter(p => !!p); var current = FS.root; var current_path = "/"; for (var i = 0; i < parts.length; i++) {
                var islast = i === parts.length - 1;
                if (islast && opts.parent) {
                    break;
                }
                current = FS.lookupNode(current, parts[i]);
                current_path = PATH.join2(current_path, parts[i]);
                if (FS.isMountpoint(current)) {
                    if (!islast || islast && opts.follow_mount) {
                        current = current.mounted.root;
                    }
                }
                if (!islast || opts.follow) {
                    var count = 0;
                    while (FS.isLink(current.mode)) {
                        var link = FS.readlink(current_path);
                        current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
                        var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count + 1 });
                        current = lookup.node;
                        if (count++ > 40) {
                            throw new FS.ErrnoError(32);
                        }
                    }
                }
            } return { path: current_path, node: current }; }, getPath: node => { var path; while (true) {
                if (FS.isRoot(node)) {
                    var mount = node.mount.mountpoint;
                    if (!path)
                        return mount;
                    return mount[mount.length - 1] !== "/" ? mount + "/" + path : mount + path;
                }
                path = path ? node.name + "/" + path : node.name;
                node = node.parent;
            } }, hashName: (parentid, name) => { var hash = 0; for (var i = 0; i < name.length; i++) {
                hash = (hash << 5) - hash + name.charCodeAt(i) | 0;
            } return (parentid + hash >>> 0) % FS.nameTable.length; }, hashAddNode: node => { var hash = FS.hashName(node.parent.id, node.name); node.name_next = FS.nameTable[hash]; FS.nameTable[hash] = node; }, hashRemoveNode: node => { var hash = FS.hashName(node.parent.id, node.name); if (FS.nameTable[hash] === node) {
                FS.nameTable[hash] = node.name_next;
            }
            else {
                var current = FS.nameTable[hash];
                while (current) {
                    if (current.name_next === node) {
                        current.name_next = node.name_next;
                        break;
                    }
                    current = current.name_next;
                }
            } }, lookupNode: (parent, name) => { var errCode = FS.mayLookup(parent); if (errCode) {
                throw new FS.ErrnoError(errCode, parent);
            } var hash = FS.hashName(parent.id, name); for (var node = FS.nameTable[hash]; node; node = node.name_next) {
                var nodeName = node.name;
                if (node.parent.id === parent.id && nodeName === name) {
                    return node;
                }
            } return FS.lookup(parent, name); }, createNode: (parent, name, mode, rdev) => { var node = new FS.FSNode(parent, name, mode, rdev); FS.hashAddNode(node); return node; }, destroyNode: node => { FS.hashRemoveNode(node); }, isRoot: node => { return node === node.parent; }, isMountpoint: node => { return !!node.mounted; }, isFile: mode => { return (mode & 61440) === 32768; }, isDir: mode => { return (mode & 61440) === 16384; }, isLink: mode => { return (mode & 61440) === 40960; }, isChrdev: mode => { return (mode & 61440) === 8192; }, isBlkdev: mode => { return (mode & 61440) === 24576; }, isFIFO: mode => { return (mode & 61440) === 4096; }, isSocket: mode => { return (mode & 49152) === 49152; }, flagModes: { "r": 0, "r+": 2, "w": 577, "w+": 578, "a": 1089, "a+": 1090 }, modeStringToFlags: str => { var flags = FS.flagModes[str]; if (typeof flags == "undefined") {
                throw new Error("Unknown file open mode: " + str);
            } return flags; }, flagsToPermissionString: flag => { var perms = ["r", "w", "rw"][flag & 3]; if (flag & 512) {
                perms += "w";
            } return perms; }, nodePermissions: (node, perms) => { if (FS.ignorePermissions) {
                return 0;
            } if (perms.includes("r") && !(node.mode & 292)) {
                return 2;
            }
            else if (perms.includes("w") && !(node.mode & 146)) {
                return 2;
            }
            else if (perms.includes("x") && !(node.mode & 73)) {
                return 2;
            } return 0; }, mayLookup: dir => { var errCode = FS.nodePermissions(dir, "x"); if (errCode)
                return errCode; if (!dir.node_ops.lookup)
                return 2; return 0; }, mayCreate: (dir, name) => { try {
                var node = FS.lookupNode(dir, name);
                return 20;
            }
            catch (e) { } return FS.nodePermissions(dir, "wx"); }, mayDelete: (dir, name, isdir) => { var node; try {
                node = FS.lookupNode(dir, name);
            }
            catch (e) {
                return e.errno;
            } var errCode = FS.nodePermissions(dir, "wx"); if (errCode) {
                return errCode;
            } if (isdir) {
                if (!FS.isDir(node.mode)) {
                    return 54;
                }
                if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
                    return 10;
                }
            }
            else {
                if (FS.isDir(node.mode)) {
                    return 31;
                }
            } return 0; }, mayOpen: (node, flags) => { if (!node) {
                return 44;
            } if (FS.isLink(node.mode)) {
                return 32;
            }
            else if (FS.isDir(node.mode)) {
                if (FS.flagsToPermissionString(flags) !== "r" || flags & 512) {
                    return 31;
                }
            } return FS.nodePermissions(node, FS.flagsToPermissionString(flags)); }, MAX_OPEN_FDS: 4096, nextfd: (fd_start = 0, fd_end = FS.MAX_OPEN_FDS) => { for (var fd = fd_start; fd <= fd_end; fd++) {
                if (!FS.streams[fd]) {
                    return fd;
                }
            } throw new FS.ErrnoError(33); }, getStream: fd => FS.streams[fd], createStream: (stream, fd_start, fd_end) => { if (!FS.FSStream) {
                FS.FSStream = function () { this.shared = {}; };
                FS.FSStream.prototype = {};
                Object.defineProperties(FS.FSStream.prototype, { object: { get: function () { return this.node; }, set: function (val) { this.node = val; } }, isRead: { get: function () { return (this.flags & 2097155) !== 1; } }, isWrite: { get: function () { return (this.flags & 2097155) !== 0; } }, isAppend: { get: function () { return this.flags & 1024; } }, flags: { get: function () { return this.shared.flags; }, set: function (val) { this.shared.flags = val; } }, position: { get: function () { return this.shared.position; }, set: function (val) { this.shared.position = val; } } });
            } stream = Object.assign(new FS.FSStream, stream); var fd = FS.nextfd(fd_start, fd_end); stream.fd = fd; FS.streams[fd] = stream; return stream; }, closeStream: fd => { FS.streams[fd] = null; }, chrdev_stream_ops: { open: stream => { var device = FS.getDevice(stream.node.rdev); stream.stream_ops = device.stream_ops; if (stream.stream_ops.open) {
                    stream.stream_ops.open(stream);
                } }, llseek: () => { throw new FS.ErrnoError(70); } }, major: dev => dev >> 8, minor: dev => dev & 255, makedev: (ma, mi) => ma << 8 | mi, registerDevice: (dev, ops) => { FS.devices[dev] = { stream_ops: ops }; }, getDevice: dev => FS.devices[dev], getMounts: mount => { var mounts = []; var check = [mount]; while (check.length) {
                var m = check.pop();
                mounts.push(m);
                check.push.apply(check, m.mounts);
            } return mounts; }, syncfs: (populate, callback) => { if (typeof populate == "function") {
                callback = populate;
                populate = false;
            } FS.syncFSRequests++; if (FS.syncFSRequests > 1) {
                err("warning: " + FS.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work");
            } var mounts = FS.getMounts(FS.root.mount); var completed = 0; function doCallback(errCode) { FS.syncFSRequests--; return callback(errCode); } function done(errCode) { if (errCode) {
                if (!done.errored) {
                    done.errored = true;
                    return doCallback(errCode);
                }
                return;
            } if (++completed >= mounts.length) {
                doCallback(null);
            } } mounts.forEach(mount => { if (!mount.type.syncfs) {
                return done(null);
            } mount.type.syncfs(mount, populate, done); }); }, mount: (type, opts, mountpoint) => { var root = mountpoint === "/"; var pseudo = !mountpoint; var node; if (root && FS.root) {
                throw new FS.ErrnoError(10);
            }
            else if (!root && !pseudo) {
                var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
                mountpoint = lookup.path;
                node = lookup.node;
                if (FS.isMountpoint(node)) {
                    throw new FS.ErrnoError(10);
                }
                if (!FS.isDir(node.mode)) {
                    throw new FS.ErrnoError(54);
                }
            } var mount = { type: type, opts: opts, mountpoint: mountpoint, mounts: [] }; var mountRoot = type.mount(mount); mountRoot.mount = mount; mount.root = mountRoot; if (root) {
                FS.root = mountRoot;
            }
            else if (node) {
                node.mounted = mount;
                if (node.mount) {
                    node.mount.mounts.push(mount);
                }
            } return mountRoot; }, unmount: mountpoint => { var lookup = FS.lookupPath(mountpoint, { follow_mount: false }); if (!FS.isMountpoint(lookup.node)) {
                throw new FS.ErrnoError(28);
            } var node = lookup.node; var mount = node.mounted; var mounts = FS.getMounts(mount); Object.keys(FS.nameTable).forEach(hash => { var current = FS.nameTable[hash]; while (current) {
                var next = current.name_next;
                if (mounts.includes(current.mount)) {
                    FS.destroyNode(current);
                }
                current = next;
            } }); node.mounted = null; var idx = node.mount.mounts.indexOf(mount); node.mount.mounts.splice(idx, 1); }, lookup: (parent, name) => { return parent.node_ops.lookup(parent, name); }, mknod: (path, mode, dev) => { var lookup = FS.lookupPath(path, { parent: true }); var parent = lookup.node; var name = PATH.basename(path); if (!name || name === "." || name === "..") {
                throw new FS.ErrnoError(28);
            } var errCode = FS.mayCreate(parent, name); if (errCode) {
                throw new FS.ErrnoError(errCode);
            } if (!parent.node_ops.mknod) {
                throw new FS.ErrnoError(63);
            } return parent.node_ops.mknod(parent, name, mode, dev); }, create: (path, mode) => { mode = mode !== undefined ? mode : 438; mode &= 4095; mode |= 32768; return FS.mknod(path, mode, 0); }, mkdir: (path, mode) => { mode = mode !== undefined ? mode : 511; mode &= 511 | 512; mode |= 16384; return FS.mknod(path, mode, 0); }, mkdirTree: (path, mode) => { var dirs = path.split("/"); var d = ""; for (var i = 0; i < dirs.length; ++i) {
                if (!dirs[i])
                    continue;
                d += "/" + dirs[i];
                try {
                    FS.mkdir(d, mode);
                }
                catch (e) {
                    if (e.errno != 20)
                        throw e;
                }
            } }, mkdev: (path, mode, dev) => { if (typeof dev == "undefined") {
                dev = mode;
                mode = 438;
            } mode |= 8192; return FS.mknod(path, mode, dev); }, symlink: (oldpath, newpath) => { if (!PATH_FS.resolve(oldpath)) {
                throw new FS.ErrnoError(44);
            } var lookup = FS.lookupPath(newpath, { parent: true }); var parent = lookup.node; if (!parent) {
                throw new FS.ErrnoError(44);
            } var newname = PATH.basename(newpath); var errCode = FS.mayCreate(parent, newname); if (errCode) {
                throw new FS.ErrnoError(errCode);
            } if (!parent.node_ops.symlink) {
                throw new FS.ErrnoError(63);
            } return parent.node_ops.symlink(parent, newname, oldpath); }, rename: (old_path, new_path) => { var old_dirname = PATH.dirname(old_path); var new_dirname = PATH.dirname(new_path); var old_name = PATH.basename(old_path); var new_name = PATH.basename(new_path); var lookup, old_dir, new_dir; lookup = FS.lookupPath(old_path, { parent: true }); old_dir = lookup.node; lookup = FS.lookupPath(new_path, { parent: true }); new_dir = lookup.node; if (!old_dir || !new_dir)
                throw new FS.ErrnoError(44); if (old_dir.mount !== new_dir.mount) {
                throw new FS.ErrnoError(75);
            } var old_node = FS.lookupNode(old_dir, old_name); var relative = PATH_FS.relative(old_path, new_dirname); if (relative.charAt(0) !== ".") {
                throw new FS.ErrnoError(28);
            } relative = PATH_FS.relative(new_path, old_dirname); if (relative.charAt(0) !== ".") {
                throw new FS.ErrnoError(55);
            } var new_node; try {
                new_node = FS.lookupNode(new_dir, new_name);
            }
            catch (e) { } if (old_node === new_node) {
                return;
            } var isdir = FS.isDir(old_node.mode); var errCode = FS.mayDelete(old_dir, old_name, isdir); if (errCode) {
                throw new FS.ErrnoError(errCode);
            } errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name); if (errCode) {
                throw new FS.ErrnoError(errCode);
            } if (!old_dir.node_ops.rename) {
                throw new FS.ErrnoError(63);
            } if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
                throw new FS.ErrnoError(10);
            } if (new_dir !== old_dir) {
                errCode = FS.nodePermissions(old_dir, "w");
                if (errCode) {
                    throw new FS.ErrnoError(errCode);
                }
            } FS.hashRemoveNode(old_node); try {
                old_dir.node_ops.rename(old_node, new_dir, new_name);
            }
            catch (e) {
                throw e;
            }
            finally {
                FS.hashAddNode(old_node);
            } }, rmdir: path => { var lookup = FS.lookupPath(path, { parent: true }); var parent = lookup.node; var name = PATH.basename(path); var node = FS.lookupNode(parent, name); var errCode = FS.mayDelete(parent, name, true); if (errCode) {
                throw new FS.ErrnoError(errCode);
            } if (!parent.node_ops.rmdir) {
                throw new FS.ErrnoError(63);
            } if (FS.isMountpoint(node)) {
                throw new FS.ErrnoError(10);
            } parent.node_ops.rmdir(parent, name); FS.destroyNode(node); }, readdir: path => { var lookup = FS.lookupPath(path, { follow: true }); var node = lookup.node; if (!node.node_ops.readdir) {
                throw new FS.ErrnoError(54);
            } return node.node_ops.readdir(node); }, unlink: path => { var lookup = FS.lookupPath(path, { parent: true }); var parent = lookup.node; if (!parent) {
                throw new FS.ErrnoError(44);
            } var name = PATH.basename(path); var node = FS.lookupNode(parent, name); var errCode = FS.mayDelete(parent, name, false); if (errCode) {
                throw new FS.ErrnoError(errCode);
            } if (!parent.node_ops.unlink) {
                throw new FS.ErrnoError(63);
            } if (FS.isMountpoint(node)) {
                throw new FS.ErrnoError(10);
            } parent.node_ops.unlink(parent, name); FS.destroyNode(node); }, readlink: path => { var lookup = FS.lookupPath(path); var link = lookup.node; if (!link) {
                throw new FS.ErrnoError(44);
            } if (!link.node_ops.readlink) {
                throw new FS.ErrnoError(28);
            } return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link)); }, stat: (path, dontFollow) => { var lookup = FS.lookupPath(path, { follow: !dontFollow }); var node = lookup.node; if (!node) {
                throw new FS.ErrnoError(44);
            } if (!node.node_ops.getattr) {
                throw new FS.ErrnoError(63);
            } return node.node_ops.getattr(node); }, lstat: path => { return FS.stat(path, true); }, chmod: (path, mode, dontFollow) => { var node; if (typeof path == "string") {
                var lookup = FS.lookupPath(path, { follow: !dontFollow });
                node = lookup.node;
            }
            else {
                node = path;
            } if (!node.node_ops.setattr) {
                throw new FS.ErrnoError(63);
            } node.node_ops.setattr(node, { mode: mode & 4095 | node.mode & ~4095, timestamp: Date.now() }); }, lchmod: (path, mode) => { FS.chmod(path, mode, true); }, fchmod: (fd, mode) => { var stream = FS.getStream(fd); if (!stream) {
                throw new FS.ErrnoError(8);
            } FS.chmod(stream.node, mode); }, chown: (path, uid, gid, dontFollow) => { var node; if (typeof path == "string") {
                var lookup = FS.lookupPath(path, { follow: !dontFollow });
                node = lookup.node;
            }
            else {
                node = path;
            } if (!node.node_ops.setattr) {
                throw new FS.ErrnoError(63);
            } node.node_ops.setattr(node, { timestamp: Date.now() }); }, lchown: (path, uid, gid) => { FS.chown(path, uid, gid, true); }, fchown: (fd, uid, gid) => { var stream = FS.getStream(fd); if (!stream) {
                throw new FS.ErrnoError(8);
            } FS.chown(stream.node, uid, gid); }, truncate: (path, len) => { if (len < 0) {
                throw new FS.ErrnoError(28);
            } var node; if (typeof path == "string") {
                var lookup = FS.lookupPath(path, { follow: true });
                node = lookup.node;
            }
            else {
                node = path;
            } if (!node.node_ops.setattr) {
                throw new FS.ErrnoError(63);
            } if (FS.isDir(node.mode)) {
                throw new FS.ErrnoError(31);
            } if (!FS.isFile(node.mode)) {
                throw new FS.ErrnoError(28);
            } var errCode = FS.nodePermissions(node, "w"); if (errCode) {
                throw new FS.ErrnoError(errCode);
            } node.node_ops.setattr(node, { size: len, timestamp: Date.now() }); }, ftruncate: (fd, len) => { var stream = FS.getStream(fd); if (!stream) {
                throw new FS.ErrnoError(8);
            } if ((stream.flags & 2097155) === 0) {
                throw new FS.ErrnoError(28);
            } FS.truncate(stream.node, len); }, utime: (path, atime, mtime) => { var lookup = FS.lookupPath(path, { follow: true }); var node = lookup.node; node.node_ops.setattr(node, { timestamp: Math.max(atime, mtime) }); }, open: (path, flags, mode) => { if (path === "") {
                throw new FS.ErrnoError(44);
            } flags = typeof flags == "string" ? FS.modeStringToFlags(flags) : flags; mode = typeof mode == "undefined" ? 438 : mode; if (flags & 64) {
                mode = mode & 4095 | 32768;
            }
            else {
                mode = 0;
            } var node; if (typeof path == "object") {
                node = path;
            }
            else {
                path = PATH.normalize(path);
                try {
                    var lookup = FS.lookupPath(path, { follow: !(flags & 131072) });
                    node = lookup.node;
                }
                catch (e) { }
            } var created = false; if (flags & 64) {
                if (node) {
                    if (flags & 128) {
                        throw new FS.ErrnoError(20);
                    }
                }
                else {
                    node = FS.mknod(path, mode, 0);
                    created = true;
                }
            } if (!node) {
                throw new FS.ErrnoError(44);
            } if (FS.isChrdev(node.mode)) {
                flags &= ~512;
            } if (flags & 65536 && !FS.isDir(node.mode)) {
                throw new FS.ErrnoError(54);
            } if (!created) {
                var errCode = FS.mayOpen(node, flags);
                if (errCode) {
                    throw new FS.ErrnoError(errCode);
                }
            } if (flags & 512 && !created) {
                FS.truncate(node, 0);
            } flags &= ~(128 | 512 | 131072); var stream = FS.createStream({ node: node, path: FS.getPath(node), flags: flags, seekable: true, position: 0, stream_ops: node.stream_ops, ungotten: [], error: false }); if (stream.stream_ops.open) {
                stream.stream_ops.open(stream);
            } if (Module["logReadFiles"] && !(flags & 1)) {
                if (!FS.readFiles)
                    FS.readFiles = {};
                if (!(path in FS.readFiles)) {
                    FS.readFiles[path] = 1;
                }
            } return stream; }, close: stream => { if (FS.isClosed(stream)) {
                throw new FS.ErrnoError(8);
            } if (stream.getdents)
                stream.getdents = null; try {
                if (stream.stream_ops.close) {
                    stream.stream_ops.close(stream);
                }
            }
            catch (e) {
                throw e;
            }
            finally {
                FS.closeStream(stream.fd);
            } stream.fd = null; }, isClosed: stream => { return stream.fd === null; }, llseek: (stream, offset, whence) => { if (FS.isClosed(stream)) {
                throw new FS.ErrnoError(8);
            } if (!stream.seekable || !stream.stream_ops.llseek) {
                throw new FS.ErrnoError(70);
            } if (whence != 0 && whence != 1 && whence != 2) {
                throw new FS.ErrnoError(28);
            } stream.position = stream.stream_ops.llseek(stream, offset, whence); stream.ungotten = []; return stream.position; }, read: (stream, buffer, offset, length, position) => { if (length < 0 || position < 0) {
                throw new FS.ErrnoError(28);
            } if (FS.isClosed(stream)) {
                throw new FS.ErrnoError(8);
            } if ((stream.flags & 2097155) === 1) {
                throw new FS.ErrnoError(8);
            } if (FS.isDir(stream.node.mode)) {
                throw new FS.ErrnoError(31);
            } if (!stream.stream_ops.read) {
                throw new FS.ErrnoError(28);
            } var seeking = typeof position != "undefined"; if (!seeking) {
                position = stream.position;
            }
            else if (!stream.seekable) {
                throw new FS.ErrnoError(70);
            } var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position); if (!seeking)
                stream.position += bytesRead; return bytesRead; }, write: (stream, buffer, offset, length, position, canOwn) => { if (length < 0 || position < 0) {
                throw new FS.ErrnoError(28);
            } if (FS.isClosed(stream)) {
                throw new FS.ErrnoError(8);
            } if ((stream.flags & 2097155) === 0) {
                throw new FS.ErrnoError(8);
            } if (FS.isDir(stream.node.mode)) {
                throw new FS.ErrnoError(31);
            } if (!stream.stream_ops.write) {
                throw new FS.ErrnoError(28);
            } if (stream.seekable && stream.flags & 1024) {
                FS.llseek(stream, 0, 2);
            } var seeking = typeof position != "undefined"; if (!seeking) {
                position = stream.position;
            }
            else if (!stream.seekable) {
                throw new FS.ErrnoError(70);
            } var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn); if (!seeking)
                stream.position += bytesWritten; return bytesWritten; }, allocate: (stream, offset, length) => { if (FS.isClosed(stream)) {
                throw new FS.ErrnoError(8);
            } if (offset < 0 || length <= 0) {
                throw new FS.ErrnoError(28);
            } if ((stream.flags & 2097155) === 0) {
                throw new FS.ErrnoError(8);
            } if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
                throw new FS.ErrnoError(43);
            } if (!stream.stream_ops.allocate) {
                throw new FS.ErrnoError(138);
            } stream.stream_ops.allocate(stream, offset, length); }, mmap: (stream, length, position, prot, flags) => { if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
                throw new FS.ErrnoError(2);
            } if ((stream.flags & 2097155) === 1) {
                throw new FS.ErrnoError(2);
            } if (!stream.stream_ops.mmap) {
                throw new FS.ErrnoError(43);
            } return stream.stream_ops.mmap(stream, length, position, prot, flags); }, msync: (stream, buffer, offset, length, mmapFlags) => { if (!stream.stream_ops.msync) {
                return 0;
            } return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags); }, munmap: stream => 0, ioctl: (stream, cmd, arg) => { if (!stream.stream_ops.ioctl) {
                throw new FS.ErrnoError(59);
            } return stream.stream_ops.ioctl(stream, cmd, arg); }, readFile: (path, opts = {}) => { opts.flags = opts.flags || 0; opts.encoding = opts.encoding || "binary"; if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
                throw new Error('Invalid encoding type "' + opts.encoding + '"');
            } var ret; var stream = FS.open(path, opts.flags); var stat = FS.stat(path); var length = stat.size; var buf = new Uint8Array(length); FS.read(stream, buf, 0, length, 0); if (opts.encoding === "utf8") {
                ret = UTF8ArrayToString(buf, 0);
            }
            else if (opts.encoding === "binary") {
                ret = buf;
            } FS.close(stream); return ret; }, writeFile: (path, data, opts = {}) => { opts.flags = opts.flags || 577; var stream = FS.open(path, opts.flags, opts.mode); if (typeof data == "string") {
                var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
                var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
                FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
            }
            else if (ArrayBuffer.isView(data)) {
                FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
            }
            else {
                throw new Error("Unsupported data type");
            } FS.close(stream); }, cwd: () => FS.currentPath, chdir: path => { var lookup = FS.lookupPath(path, { follow: true }); if (lookup.node === null) {
                throw new FS.ErrnoError(44);
            } if (!FS.isDir(lookup.node.mode)) {
                throw new FS.ErrnoError(54);
            } var errCode = FS.nodePermissions(lookup.node, "x"); if (errCode) {
                throw new FS.ErrnoError(errCode);
            } FS.currentPath = lookup.path; }, createDefaultDirectories: () => { FS.mkdir("/tmp"); FS.mkdir("/home"); FS.mkdir("/home/web_user"); }, createDefaultDevices: () => { FS.mkdir("/dev"); FS.registerDevice(FS.makedev(1, 3), { read: () => 0, write: (stream, buffer, offset, length, pos) => length }); FS.mkdev("/dev/null", FS.makedev(1, 3)); TTY.register(FS.makedev(5, 0), TTY.default_tty_ops); TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops); FS.mkdev("/dev/tty", FS.makedev(5, 0)); FS.mkdev("/dev/tty1", FS.makedev(6, 0)); var randomBuffer = new Uint8Array(1024), randomLeft = 0; var randomByte = () => { if (randomLeft === 0) {
                randomLeft = randomFill(randomBuffer).byteLength;
            } return randomBuffer[--randomLeft]; }; FS.createDevice("/dev", "random", randomByte); FS.createDevice("/dev", "urandom", randomByte); FS.mkdir("/dev/shm"); FS.mkdir("/dev/shm/tmp"); }, createSpecialDirectories: () => { FS.mkdir("/proc"); var proc_self = FS.mkdir("/proc/self"); FS.mkdir("/proc/self/fd"); FS.mount({ mount: () => { var node = FS.createNode(proc_self, "fd", 16384 | 511, 73); node.node_ops = { lookup: (parent, name) => { var fd = +name; var stream = FS.getStream(fd); if (!stream)
                        throw new FS.ErrnoError(8); var ret = { parent: null, mount: { mountpoint: "fake" }, node_ops: { readlink: () => stream.path } }; ret.parent = ret; return ret; } }; return node; } }, {}, "/proc/self/fd"); }, createStandardStreams: () => { if (Module["stdin"]) {
                FS.createDevice("/dev", "stdin", Module["stdin"]);
            }
            else {
                FS.symlink("/dev/tty", "/dev/stdin");
            } if (Module["stdout"]) {
                FS.createDevice("/dev", "stdout", null, Module["stdout"]);
            }
            else {
                FS.symlink("/dev/tty", "/dev/stdout");
            } if (Module["stderr"]) {
                FS.createDevice("/dev", "stderr", null, Module["stderr"]);
            }
            else {
                FS.symlink("/dev/tty1", "/dev/stderr");
            } var stdin = FS.open("/dev/stdin", 0); var stdout = FS.open("/dev/stdout", 1); var stderr = FS.open("/dev/stderr", 1); }, ensureErrnoError: () => { if (FS.ErrnoError)
                return; FS.ErrnoError = function ErrnoError(errno, node) { this.name = "ErrnoError"; this.node = node; this.setErrno = function (errno) { this.errno = errno; }; this.setErrno(errno); this.message = "FS error"; }; FS.ErrnoError.prototype = new Error; FS.ErrnoError.prototype.constructor = FS.ErrnoError; [44].forEach(code => { FS.genericErrors[code] = new FS.ErrnoError(code); FS.genericErrors[code].stack = "<generic error, no stack>"; }); }, staticInit: () => { FS.ensureErrnoError(); FS.nameTable = new Array(4096); FS.mount(MEMFS, {}, "/"); FS.createDefaultDirectories(); FS.createDefaultDevices(); FS.createSpecialDirectories(); FS.filesystems = { "MEMFS": MEMFS }; }, init: (input, output, error) => { FS.init.initialized = true; FS.ensureErrnoError(); Module["stdin"] = input || Module["stdin"]; Module["stdout"] = output || Module["stdout"]; Module["stderr"] = error || Module["stderr"]; FS.createStandardStreams(); }, quit: () => { FS.init.initialized = false; for (var i = 0; i < FS.streams.length; i++) {
                var stream = FS.streams[i];
                if (!stream) {
                    continue;
                }
                FS.close(stream);
            } }, getMode: (canRead, canWrite) => { var mode = 0; if (canRead)
                mode |= 292 | 73; if (canWrite)
                mode |= 146; return mode; }, findObject: (path, dontResolveLastLink) => { var ret = FS.analyzePath(path, dontResolveLastLink); if (!ret.exists) {
                return null;
            } return ret.object; }, analyzePath: (path, dontResolveLastLink) => { try {
                var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
                path = lookup.path;
            }
            catch (e) { } var ret = { isRoot: false, exists: false, error: 0, name: null, path: null, object: null, parentExists: false, parentPath: null, parentObject: null }; try {
                var lookup = FS.lookupPath(path, { parent: true });
                ret.parentExists = true;
                ret.parentPath = lookup.path;
                ret.parentObject = lookup.node;
                ret.name = PATH.basename(path);
                lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
                ret.exists = true;
                ret.path = lookup.path;
                ret.object = lookup.node;
                ret.name = lookup.node.name;
                ret.isRoot = lookup.path === "/";
            }
            catch (e) {
                ret.error = e.errno;
            } return ret; }, createPath: (parent, path, canRead, canWrite) => { parent = typeof parent == "string" ? parent : FS.getPath(parent); var parts = path.split("/").reverse(); while (parts.length) {
                var part = parts.pop();
                if (!part)
                    continue;
                var current = PATH.join2(parent, part);
                try {
                    FS.mkdir(current);
                }
                catch (e) { }
                parent = current;
            } return current; }, createFile: (parent, name, properties, canRead, canWrite) => { var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name); var mode = FS.getMode(canRead, canWrite); return FS.create(path, mode); }, createDataFile: (parent, name, data, canRead, canWrite, canOwn) => { var path = name; if (parent) {
                parent = typeof parent == "string" ? parent : FS.getPath(parent);
                path = name ? PATH.join2(parent, name) : parent;
            } var mode = FS.getMode(canRead, canWrite); var node = FS.create(path, mode); if (data) {
                if (typeof data == "string") {
                    var arr = new Array(data.length);
                    for (var i = 0, len = data.length; i < len; ++i)
                        arr[i] = data.charCodeAt(i);
                    data = arr;
                }
                FS.chmod(node, mode | 146);
                var stream = FS.open(node, 577);
                FS.write(stream, data, 0, data.length, 0, canOwn);
                FS.close(stream);
                FS.chmod(node, mode);
            } return node; }, createDevice: (parent, name, input, output) => { var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name); var mode = FS.getMode(!!input, !!output); if (!FS.createDevice.major)
                FS.createDevice.major = 64; var dev = FS.makedev(FS.createDevice.major++, 0); FS.registerDevice(dev, { open: stream => { stream.seekable = false; }, close: stream => { if (output && output.buffer && output.buffer.length) {
                    output(10);
                } }, read: (stream, buffer, offset, length, pos) => { var bytesRead = 0; for (var i = 0; i < length; i++) {
                    var result;
                    try {
                        result = input();
                    }
                    catch (e) {
                        throw new FS.ErrnoError(29);
                    }
                    if (result === undefined && bytesRead === 0) {
                        throw new FS.ErrnoError(6);
                    }
                    if (result === null || result === undefined)
                        break;
                    bytesRead++;
                    buffer[offset + i] = result;
                } if (bytesRead) {
                    stream.node.timestamp = Date.now();
                } return bytesRead; }, write: (stream, buffer, offset, length, pos) => { for (var i = 0; i < length; i++) {
                    try {
                        output(buffer[offset + i]);
                    }
                    catch (e) {
                        throw new FS.ErrnoError(29);
                    }
                } if (length) {
                    stream.node.timestamp = Date.now();
                } return i; } }); return FS.mkdev(path, mode, dev); }, forceLoadFile: obj => { if (obj.isDevice || obj.isFolder || obj.link || obj.contents)
                return true; if (typeof XMLHttpRequest != "undefined") {
                throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
            }
            else if (read_) {
                try {
                    obj.contents = intArrayFromString(read_(obj.url), true);
                    obj.usedBytes = obj.contents.length;
                }
                catch (e) {
                    throw new FS.ErrnoError(29);
                }
            }
            else {
                throw new Error("Cannot load without read() or XMLHttpRequest.");
            } }, createLazyFile: (parent, name, url, canRead, canWrite) => { function LazyUint8Array() { this.lengthKnown = false; this.chunks = []; } LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) { if (idx > this.length - 1 || idx < 0) {
                return undefined;
            } var chunkOffset = idx % this.chunkSize; var chunkNum = idx / this.chunkSize | 0; return this.getter(chunkNum)[chunkOffset]; }; LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) { this.getter = getter; }; LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() { var xhr = new XMLHttpRequest; xhr.open("HEAD", url, false); xhr.send(null); if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304))
                throw new Error("Couldn't load " + url + ". Status: " + xhr.status); var datalength = Number(xhr.getResponseHeader("Content-length")); var header; var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes"; var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip"; var chunkSize = 1024 * 1024; if (!hasByteServing)
                chunkSize = datalength; var doXHR = (from, to) => { if (from > to)
                throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!"); if (to > datalength - 1)
                throw new Error("only " + datalength + " bytes available! programmer error!"); var xhr = new XMLHttpRequest; xhr.open("GET", url, false); if (datalength !== chunkSize)
                xhr.setRequestHeader("Range", "bytes=" + from + "-" + to); xhr.responseType = "arraybuffer"; if (xhr.overrideMimeType) {
                xhr.overrideMimeType("text/plain; charset=x-user-defined");
            } xhr.send(null); if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304))
                throw new Error("Couldn't load " + url + ". Status: " + xhr.status); if (xhr.response !== undefined) {
                return new Uint8Array(xhr.response || []);
            } return intArrayFromString(xhr.responseText || "", true); }; var lazyArray = this; lazyArray.setDataGetter(chunkNum => { var start = chunkNum * chunkSize; var end = (chunkNum + 1) * chunkSize - 1; end = Math.min(end, datalength - 1); if (typeof lazyArray.chunks[chunkNum] == "undefined") {
                lazyArray.chunks[chunkNum] = doXHR(start, end);
            } if (typeof lazyArray.chunks[chunkNum] == "undefined")
                throw new Error("doXHR failed!"); return lazyArray.chunks[chunkNum]; }); if (usesGzip || !datalength) {
                chunkSize = datalength = 1;
                datalength = this.getter(0).length;
                chunkSize = datalength;
                out("LazyFiles on gzip forces download of the whole file when length is accessed");
            } this._length = datalength; this._chunkSize = chunkSize; this.lengthKnown = true; }; if (typeof XMLHttpRequest != "undefined") {
                if (!ENVIRONMENT_IS_WORKER)
                    throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
                var lazyArray = new LazyUint8Array;
                Object.defineProperties(lazyArray, { length: { get: function () { if (!this.lengthKnown) {
                            this.cacheLength();
                        } return this._length; } }, chunkSize: { get: function () { if (!this.lengthKnown) {
                            this.cacheLength();
                        } return this._chunkSize; } } });
                var properties = { isDevice: false, contents: lazyArray };
            }
            else {
                var properties = { isDevice: false, url: url };
            } var node = FS.createFile(parent, name, properties, canRead, canWrite); if (properties.contents) {
                node.contents = properties.contents;
            }
            else if (properties.url) {
                node.contents = null;
                node.url = properties.url;
            } Object.defineProperties(node, { usedBytes: { get: function () { return this.contents.length; } } }); var stream_ops = {}; var keys = Object.keys(node.stream_ops); keys.forEach(key => { var fn = node.stream_ops[key]; stream_ops[key] = function forceLoadLazyFile() { FS.forceLoadFile(node); return fn.apply(null, arguments); }; }); function writeChunks(stream, buffer, offset, length, position) { var contents = stream.node.contents; if (position >= contents.length)
                return 0; var size = Math.min(contents.length - position, length); if (contents.slice) {
                for (var i = 0; i < size; i++) {
                    buffer[offset + i] = contents[position + i];
                }
            }
            else {
                for (var i = 0; i < size; i++) {
                    buffer[offset + i] = contents.get(position + i);
                }
            } return size; } stream_ops.read = (stream, buffer, offset, length, position) => { FS.forceLoadFile(node); return writeChunks(stream, buffer, offset, length, position); }; stream_ops.mmap = (stream, length, position, prot, flags) => { FS.forceLoadFile(node); var ptr = mmapAlloc(length); if (!ptr) {
                throw new FS.ErrnoError(48);
            } writeChunks(stream, HEAP8, ptr, length, position); return { ptr: ptr, allocated: true }; }; node.stream_ops = stream_ops; return node; }, createPreloadedFile: (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => { var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent; var dep = getUniqueRunDependency("cp " + fullname); function processData(byteArray) { function finish(byteArray) { if (preFinish)
                preFinish(); if (!dontCreateFile) {
                FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
            } if (onload)
                onload(); removeRunDependency(dep); } if (Browser.handledByPreloadPlugin(byteArray, fullname, finish, () => { if (onerror)
                onerror(); removeRunDependency(dep); })) {
                return;
            } finish(byteArray); } addRunDependency(dep); if (typeof url == "string") {
                asyncLoad(url, byteArray => processData(byteArray), onerror);
            }
            else {
                processData(url);
            } } };
        var SYSCALLS = { DEFAULT_POLLMASK: 5, calculateAt: function (dirfd, path, allowEmpty) { if (PATH.isAbs(path)) {
                return path;
            } var dir; if (dirfd === -100) {
                dir = FS.cwd();
            }
            else {
                var dirstream = SYSCALLS.getStreamFromFD(dirfd);
                dir = dirstream.path;
            } if (path.length == 0) {
                if (!allowEmpty) {
                    throw new FS.ErrnoError(44);
                }
                return dir;
            } return PATH.join2(dir, path); }, doStat: function (func, path, buf) { try {
                var stat = func(path);
            }
            catch (e) {
                if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
                    return -54;
                }
                throw e;
            } HEAP32[buf >> 2] = stat.dev; HEAP32[buf + 8 >> 2] = stat.ino; HEAP32[buf + 12 >> 2] = stat.mode; HEAPU32[buf + 16 >> 2] = stat.nlink; HEAP32[buf + 20 >> 2] = stat.uid; HEAP32[buf + 24 >> 2] = stat.gid; HEAP32[buf + 28 >> 2] = stat.rdev; tempI64 = [stat.size >>> 0, (tempDouble = stat.size, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 40 >> 2] = tempI64[0], HEAP32[buf + 44 >> 2] = tempI64[1]; HEAP32[buf + 48 >> 2] = 4096; HEAP32[buf + 52 >> 2] = stat.blocks; var atime = stat.atime.getTime(); var mtime = stat.mtime.getTime(); var ctime = stat.ctime.getTime(); tempI64 = [Math.floor(atime / 1e3) >>> 0, (tempDouble = Math.floor(atime / 1e3), +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 56 >> 2] = tempI64[0], HEAP32[buf + 60 >> 2] = tempI64[1]; HEAPU32[buf + 64 >> 2] = atime % 1e3 * 1e3; tempI64 = [Math.floor(mtime / 1e3) >>> 0, (tempDouble = Math.floor(mtime / 1e3), +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 72 >> 2] = tempI64[0], HEAP32[buf + 76 >> 2] = tempI64[1]; HEAPU32[buf + 80 >> 2] = mtime % 1e3 * 1e3; tempI64 = [Math.floor(ctime / 1e3) >>> 0, (tempDouble = Math.floor(ctime / 1e3), +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 88 >> 2] = tempI64[0], HEAP32[buf + 92 >> 2] = tempI64[1]; HEAPU32[buf + 96 >> 2] = ctime % 1e3 * 1e3; tempI64 = [stat.ino >>> 0, (tempDouble = stat.ino, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 104 >> 2] = tempI64[0], HEAP32[buf + 108 >> 2] = tempI64[1]; return 0; }, doMsync: function (addr, stream, len, flags, offset) { if (!FS.isFile(stream.node.mode)) {
                throw new FS.ErrnoError(43);
            } if (flags & 2) {
                return 0;
            } var buffer = HEAPU8.slice(addr, addr + len); FS.msync(stream, buffer, offset, len, flags); }, varargs: undefined, get: function () { SYSCALLS.varargs += 4; var ret = HEAP32[SYSCALLS.varargs - 4 >> 2]; return ret; }, getStr: function (ptr) { var ret = UTF8ToString(ptr); return ret; }, getStreamFromFD: function (fd) { var stream = FS.getStream(fd); if (!stream)
                throw new FS.ErrnoError(8); return stream; } };
        function ___syscall_fcntl64(fd, cmd, varargs) { SYSCALLS.varargs = varargs; try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            switch (cmd) {
                case 0: {
                    var arg = SYSCALLS.get();
                    if (arg < 0) {
                        return -28;
                    }
                    var newStream;
                    newStream = FS.createStream(stream, arg);
                    return newStream.fd;
                }
                case 1:
                case 2: return 0;
                case 3: return stream.flags;
                case 4: {
                    var arg = SYSCALLS.get();
                    stream.flags |= arg;
                    return 0;
                }
                case 5: {
                    var arg = SYSCALLS.get();
                    var offset = 0;
                    HEAP16[arg + offset >> 1] = 2;
                    return 0;
                }
                case 6:
                case 7: return 0;
                case 16:
                case 8: return -28;
                case 9:
                    setErrNo(28);
                    return -1;
                default: {
                    return -28;
                }
            }
        }
        catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
                throw e;
            return -e.errno;
        } }
        function ___syscall_ioctl(fd, op, varargs) { SYSCALLS.varargs = varargs; try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            switch (op) {
                case 21509:
                case 21505: {
                    if (!stream.tty)
                        return -59;
                    return 0;
                }
                case 21510:
                case 21511:
                case 21512:
                case 21506:
                case 21507:
                case 21508: {
                    if (!stream.tty)
                        return -59;
                    return 0;
                }
                case 21519: {
                    if (!stream.tty)
                        return -59;
                    var argp = SYSCALLS.get();
                    HEAP32[argp >> 2] = 0;
                    return 0;
                }
                case 21520: {
                    if (!stream.tty)
                        return -59;
                    return -28;
                }
                case 21531: {
                    var argp = SYSCALLS.get();
                    return FS.ioctl(stream, op, argp);
                }
                case 21523: {
                    if (!stream.tty)
                        return -59;
                    return 0;
                }
                case 21524: {
                    if (!stream.tty)
                        return -59;
                    return 0;
                }
                default: return -28;
            }
        }
        catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
                throw e;
            return -e.errno;
        } }
        function ___syscall_openat(dirfd, path, flags, varargs) { SYSCALLS.varargs = varargs; try {
            path = SYSCALLS.getStr(path);
            path = SYSCALLS.calculateAt(dirfd, path);
            var mode = varargs ? SYSCALLS.get() : 0;
            return FS.open(path, flags, mode).fd;
        }
        catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
                throw e;
            return -e.errno;
        } }
        function _emscripten_memcpy_big(dest, src, num) { HEAPU8.copyWithin(dest, src, src + num); }
        function abortOnCannotGrowMemory(requestedSize) { abort("OOM"); }
        function _emscripten_resize_heap(requestedSize) { var oldSize = HEAPU8.length; requestedSize = requestedSize >>> 0; abortOnCannotGrowMemory(requestedSize); }
        function _proc_exit(code) { EXITSTATUS = code; if (!keepRuntimeAlive()) {
            if (Module["onExit"])
                Module["onExit"](code);
            ABORT = true;
        } quit_(code, new ExitStatus(code)); }
        function exitJS(status, implicit) { EXITSTATUS = status; _proc_exit(status); }
        var _exit = exitJS;
        function _fd_close(fd) { try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            FS.close(stream);
            return 0;
        }
        catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
                throw e;
            return e.errno;
        } }
        function doReadv(stream, iov, iovcnt, offset) { var ret = 0; for (var i = 0; i < iovcnt; i++) {
            var ptr = HEAPU32[iov >> 2];
            var len = HEAPU32[iov + 4 >> 2];
            iov += 8;
            var curr = FS.read(stream, HEAP8, ptr, len, offset);
            if (curr < 0)
                return -1;
            ret += curr;
            if (curr < len)
                break;
            if (typeof offset !== "undefined") {
                offset += curr;
            }
        } return ret; }
        function _fd_read(fd, iov, iovcnt, pnum) { try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            var num = doReadv(stream, iov, iovcnt);
            HEAPU32[pnum >> 2] = num;
            return 0;
        }
        catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
                throw e;
            return e.errno;
        } }
        function convertI32PairToI53Checked(lo, hi) { return hi + 2097152 >>> 0 < 4194305 - !!lo ? (lo >>> 0) + hi * 4294967296 : NaN; }
        function _fd_seek(fd, offset_low, offset_high, whence, newOffset) { try {
            var offset = convertI32PairToI53Checked(offset_low, offset_high);
            if (isNaN(offset))
                return 61;
            var stream = SYSCALLS.getStreamFromFD(fd);
            FS.llseek(stream, offset, whence);
            tempI64 = [stream.position >>> 0, (tempDouble = stream.position, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[newOffset >> 2] = tempI64[0], HEAP32[newOffset + 4 >> 2] = tempI64[1];
            if (stream.getdents && offset === 0 && whence === 0)
                stream.getdents = null;
            return 0;
        }
        catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
                throw e;
            return e.errno;
        } }
        function doWritev(stream, iov, iovcnt, offset) { var ret = 0; for (var i = 0; i < iovcnt; i++) {
            var ptr = HEAPU32[iov >> 2];
            var len = HEAPU32[iov + 4 >> 2];
            iov += 8;
            var curr = FS.write(stream, HEAP8, ptr, len, offset);
            if (curr < 0)
                return -1;
            ret += curr;
            if (typeof offset !== "undefined") {
                offset += curr;
            }
        } return ret; }
        function _fd_write(fd, iov, iovcnt, pnum) { try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            var num = doWritev(stream, iov, iovcnt);
            HEAPU32[pnum >> 2] = num;
            return 0;
        }
        catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
                throw e;
            return e.errno;
        } }
        function handleException(e) { if (e instanceof ExitStatus || e == "unwind") {
            return EXITSTATUS;
        } quit_(1, e); }
        function stringToUTF8(str, outPtr, maxBytesToWrite) { return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite); }
        function stringToUTF8OnStack(str) { var size = lengthBytesUTF8(str) + 1; var ret = stackAlloc(size); stringToUTF8(str, ret, size); return ret; }
        var FSNode = function (parent, name, mode, rdev) { if (!parent) {
            parent = this;
        } this.parent = parent; this.mount = parent.mount; this.mounted = null; this.id = FS.nextInode++; this.name = name; this.mode = mode; this.node_ops = {}; this.stream_ops = {}; this.rdev = rdev; };
        var readMode = 292 | 73;
        var writeMode = 146;
        Object.defineProperties(FSNode.prototype, { read: { get: function () { return (this.mode & readMode) === readMode; }, set: function (val) { val ? this.mode |= readMode : this.mode &= ~readMode; } }, write: { get: function () { return (this.mode & writeMode) === writeMode; }, set: function (val) { val ? this.mode |= writeMode : this.mode &= ~writeMode; } }, isFolder: { get: function () { return FS.isDir(this.mode); } }, isDevice: { get: function () { return FS.isChrdev(this.mode); } } });
        FS.FSNode = FSNode;
        FS.staticInit();
        var wasmImports = { "a": ___assert_fail, "e": ___syscall_fcntl64, "j": ___syscall_ioctl, "g": ___syscall_openat, "h": _emscripten_memcpy_big, "f": _emscripten_resize_heap, "b": _exit, "d": _fd_close, "i": _fd_read, "k": _fd_seek, "c": _fd_write };
        var asm = createWasm();
        var ___wasm_call_ctors = function () { return (___wasm_call_ctors = Module["asm"]["m"]).apply(null, arguments); };
        var _main = Module["_main"] = function () { return (_main = Module["_main"] = Module["asm"]["o"]).apply(null, arguments); };
        var ___errno_location = function () { return (___errno_location = Module["asm"]["p"]).apply(null, arguments); };
        var stackAlloc = function () { return (stackAlloc = Module["asm"]["q"]).apply(null, arguments); };
        Module["FS"] = FS;
        var calledRun;
        dependenciesFulfilled = function runCaller() { if (!calledRun)
            run(); if (!calledRun)
            dependenciesFulfilled = runCaller; };
        function callMain(args = []) { var entryFunction = _main; args.unshift(thisProgram); var argc = args.length; var argv = stackAlloc((argc + 1) * 4); var argv_ptr = argv >> 2; args.forEach(arg => { HEAP32[argv_ptr++] = stringToUTF8OnStack(arg); }); HEAP32[argv_ptr] = 0; try {
            var ret = entryFunction(argc, argv);
            exitJS(ret, true);
            return ret;
        }
        catch (e) {
            return handleException(e);
        } }
        function run(args = arguments_) { if (runDependencies > 0) {
            return;
        } preRun(); if (runDependencies > 0) {
            return;
        } function doRun() { if (calledRun)
            return; calledRun = true; Module["calledRun"] = true; if (ABORT)
            return; initRuntime(); preMain(); readyPromiseResolve(Module); if (Module["onRuntimeInitialized"])
            Module["onRuntimeInitialized"](); if (shouldRunNow)
            callMain(args); postRun(); } if (Module["setStatus"]) {
            Module["setStatus"]("Running...");
            setTimeout(function () { setTimeout(function () { Module["setStatus"](""); }, 1); doRun(); }, 1);
        }
        else {
            doRun();
        } }
        if (Module["preInit"]) {
            if (typeof Module["preInit"] == "function")
                Module["preInit"] = [Module["preInit"]];
            while (Module["preInit"].length > 0) {
                Module["preInit"].pop()();
            }
        }
        var shouldRunNow = true;
        if (Module["noInitialRun"])
            shouldRunNow = false;
        run();
        return createRgbLink.ready;
    });
})();
exports["default"] = createRgbLink;


/***/ }),

/***/ 68739:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const player_1 = __importDefault(__webpack_require__(89168));
const notePreview_1 = __webpack_require__(95893);
const api_1 = __importDefault(__webpack_require__(49495));
const log = (log) => {
    console.log(log);
};
const onPlayerInit = (file) => {
    if (!file) {
        log(`COMPILE ERROR`);
    }
    else {
        log(file);
        log(`COMPILE DONE`);
        api_1.default.music.sendToProjectWindow({
            action: "initialized",
        });
    }
};
const sfx = decodeURIComponent(window.location.hash).slice(1);
player_1.default.initPlayer(onPlayerInit, sfx);
player_1.default.setOnIntervalCallback((playbackUpdate) => {
    log(playbackUpdate);
    position = playbackUpdate;
    api_1.default.music.sendToProjectWindow({
        action: "update",
        update: playbackUpdate,
    });
});
let position = [0, 0];
api_1.default.events.music.data.subscribe((_event, d) => {
    log(d);
    switch (d.action) {
        case "load-song":
            player_1.default.reset();
            player_1.default.loadSong(d.song);
            api_1.default.music.sendToProjectWindow({
                action: "log",
                message: "load song",
            });
            api_1.default.music.sendToProjectWindow({
                action: "loaded",
            });
            break;
        case "load-sound":
            player_1.default.loadSound(d.sound);
            break;
        case "play":
            if (d.position) {
                position = d.position;
            }
            player_1.default.reset();
            player_1.default.play(d.song, position);
            api_1.default.music.sendToProjectWindow({
                action: "log",
                message: "playing",
            });
            break;
        case "play-sound":
            player_1.default.playSound();
            api_1.default.music.sendToProjectWindow({
                action: "log",
                message: "playing SFX",
            });
            break;
        case "stop":
            if (d.position) {
                position = d.position;
            }
            player_1.default.stop(d.position);
            api_1.default.music.sendToProjectWindow({
                action: "log",
                message: "stop",
            });
            break;
        case "position":
            if (d.position) {
                position = d.position;
            }
            player_1.default.setStartPosition(d.position);
            api_1.default.music.sendToProjectWindow({
                action: "log",
                message: "position",
            });
            break;
        case "set-mute":
            const channels = player_1.default.setChannel(d.channel, d.muted);
            api_1.default.music.sendToProjectWindow({
                action: "muted",
                channels,
            });
            break;
        case "preview":
            let waves = d.waveForms || [];
            const song = player_1.default.getCurrentSong();
            if (waves.length === 0 && song) {
                waves = song.waves;
            }
            (0, notePreview_1.playNotePreview)(d.note, d.type, d.instrument, d.square2, waves);
            api_1.default.music.sendToProjectWindow({
                action: "log",
                message: "preview",
            });
            break;
        default:
            log(`Action ${d.action} not supported`);
    }
});


/***/ }),

/***/ 31526:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BinjgbModule = exports.Binjgb = exports.createRgbFixModule = exports.createRgbLinkModule = exports.createRgbAsmModule = exports.createRgbFix = exports.createRgbLink = exports.createRgbAsm = void 0;
const rgbasm_1 = __importDefault(__webpack_require__(41649));
exports.createRgbAsm = rgbasm_1.default;
const rgblink_1 = __importDefault(__webpack_require__(3108));
exports.createRgbLink = rgblink_1.default;
const rgbfix_1 = __importDefault(__webpack_require__(18569));
exports.createRgbFix = rgbfix_1.default;
const rgbasm_wasm_1 = __importDefault(__webpack_require__(46521));
exports.createRgbAsmModule = rgbasm_wasm_1.default;
const rgblink_wasm_1 = __importDefault(__webpack_require__(21670));
exports.createRgbLinkModule = rgblink_wasm_1.default;
const rgbfix_wasm_1 = __importDefault(__webpack_require__(27077));
exports.createRgbFixModule = rgbfix_wasm_1.default;
const binjgb_1 = __importDefault(__webpack_require__(32055));
exports.Binjgb = binjgb_1.default;
const binjgb_wasm_1 = __importDefault(__webpack_require__(63457));
exports.BinjgbModule = binjgb_wasm_1.default;


/***/ }),

/***/ 144:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const storage_1 = __importDefault(__webpack_require__(57572));
const WasmModuleWrapper_1 = __webpack_require__(31526);
let busy = false;
let repeat = false;
let startDelayTimer;
let doneCallback;
let logCallback;
let errorList = [];
let romSymbols = [];
let ramSymbols = [];
let linkOptions = [];
const lineNumberRegex = /([\w.]+)[\w.:~]*\(([0-9]+)\)/gi;
const symRegex = /^\s*\$([0-9a-f]+) = ([\w.]+)/;
const sectionTypeBankRegex = /^\s*(\w+) bank #(\d+)/;
const sectionRegex = /^\s*SECTION: \$([0-9a-f]+)-\$([0-9a-f]+)/;
const slackRegex = /^\s*SLACK: \$([0-9a-f]+) bytes/;
/* see:
  https://gist.github.com/surma/b2705b6cca29357ebea1c9e6e15684cc
  https://github.com/webpack/webpack/issues/7352
*/
const locateFile = (module) => (path) => {
    if (path.endsWith(".wasm")) {
        return module;
    }
    return path;
};
function logFunction(str) {
    if (logCallback) {
        logCallback(str);
    }
    if (str.startsWith("error: ") ||
        str.startsWith("ERROR: ") ||
        str.startsWith("warning: ")) {
        let type = "error";
        if (str.startsWith("warning: "))
            type = "warning";
        const lineNumberMatch = str.matchAll(lineNumberRegex);
        for (const m of lineNumberMatch) {
            const errorLine = parseInt(m[2], 0);
            errorList.push({
                type: type,
                error: m[1],
                line: errorLine,
                message: str,
            });
        }
    }
}
function trigger() {
    if (typeof startDelayTimer != "undefined") {
        clearTimeout(startDelayTimer);
    }
    startDelayTimer = setTimeout(startCompile, 500);
}
async function startCompile() {
    if (logCallback)
        logCallback(null);
    errorList = [];
    romSymbols = [];
    ramSymbols = [];
    try {
        const objFiles = Object.keys(storage_1.default.getFiles())
            .filter((name) => name.endsWith(".asm"))
            .map(runRgbAsm);
        const files = await Promise.all(objFiles);
        const [romFile, mapFile] = await runRgbLink(files);
        const fixedRomFile = await runRgbFix(romFile);
        buildDone(fixedRomFile, mapFile);
    }
    catch (e) {
        console.log(e);
        buildFailed();
    }
}
async function runRgbAsm(target) {
    logFunction(`Running: rgbasm -E ${target} -o output.o -Wall`);
    const module = await (0, WasmModuleWrapper_1.createRgbAsm)({
        locateFile: locateFile(WasmModuleWrapper_1.createRgbAsmModule),
        arguments: ["-E", target, "-o", "output.o", "-Wall"],
        preRun: (m) => {
            const FS = m.FS;
            FS.mkdir("include");
            for (const [key, value] of Object.entries(storage_1.default.getFiles())) {
                FS.writeFile(key, value);
            }
        },
        print: logFunction,
        printErr: logFunction,
        quit: () => {
            throw new Error("Compilation failed");
        },
    });
    if (repeat) {
        throw new Error();
    }
    const FS = module.FS;
    return FS.readFile("output.o");
}
async function runRgbLink(objFiles) {
    const args = ["-o", "output.gb", "--map", "output.map"].concat(linkOptions);
    objFiles.forEach((_, idx) => {
        args.push(`${idx}.o`);
    });
    logFunction(`Running: rgblink ${args.join(" ")}`);
    const module = await (0, WasmModuleWrapper_1.createRgbLink)({
        locateFile: locateFile(WasmModuleWrapper_1.createRgbLinkModule),
        arguments: args,
        preRun: (m) => {
            const FS = m.FS;
            objFiles.forEach((_, idx) => {
                FS.writeFile(`${idx}.o`, objFiles[idx]);
            });
        },
        print: logFunction,
        printErr: logFunction,
    });
    if (repeat) {
        throw new Error();
    }
    const FS = module.FS;
    const romFile = FS.readFile("output.gb");
    const mapFile = FS.readFile("output.map", { encoding: "utf8" });
    return [romFile, mapFile];
}
async function runRgbFix(inputRomFile) {
    logFunction("Running: rgbfix -v output.gb -p 0xff");
    const module = await (0, WasmModuleWrapper_1.createRgbFix)({
        locateFile: locateFile(WasmModuleWrapper_1.createRgbFixModule),
        arguments: ["-v", "output.gb", "-p", "0xff"],
        preRun: (m) => {
            const FS = m.FS;
            FS.writeFile("output.gb", inputRomFile);
        },
        print: logFunction,
        printErr: logFunction,
    });
    const FS = module.FS;
    return FS.readFile("output.gb");
}
function buildFailed() {
    logFunction("Build failed");
    if (repeat) {
        repeat = false;
        trigger();
    }
    else {
        busy = false;
        doneCallback();
    }
}
function buildDone(romFile, mapFile) {
    if (repeat) {
        repeat = false;
        trigger();
    }
    else {
        busy = false;
        let startAddress = 0x100;
        const addrToLine = {};
        let sectionType = "";
        let bankNumber = 0;
        for (const line of mapFile.split("\n")) {
            let m;
            if ((m = symRegex.exec(line))) {
                let addr = parseInt(m[1], 16);
                let sym = m[2];
                if (sym.startsWith("__SEC_")) {
                    sym = sym.substr(6);
                    let file = sym.substr(sym.indexOf("_") + 1);
                    file = file.substr(file.indexOf("_") + 1);
                    const lineNumber = parseInt(sym.split("_")[1], 16);
                    addr = (addr & 0x3fff) | (bankNumber << 14);
                    addrToLine[addr] = [file, lineNumber];
                }
                else if (sym === "emustart" ||
                    sym === "emuStart" ||
                    sym === "emu_start") {
                    startAddress = addr;
                }
                else if (addr < 0x8000) {
                    addr = (addr & 0x3fff) | (bankNumber << 14);
                    romSymbols[addr] = sym;
                }
                else {
                    ramSymbols[addr] = sym;
                }
            }
            else if ((m = sectionRegex.exec(line))) {
                let startAddress = parseInt(m[1], 16);
                let endAddress = parseInt(m[2], 16) + 1;
                if (startAddress < 0x8000) {
                    startAddress = (startAddress & 0x3fff) | (bankNumber << 14);
                    endAddress = (endAddress & 0x3fff) | (bankNumber << 14);
                    romSymbols[startAddress] = null;
                    romSymbols[endAddress] = null;
                }
                else {
                    ramSymbols[startAddress] = null;
                    ramSymbols[endAddress] = null;
                }
            }
            else if ((m = sectionTypeBankRegex.exec(line))) {
                sectionType = m[1];
                bankNumber = parseInt(m[2], 0);
            }
            else if ((m = slackRegex.exec(line))) {
                const space = parseInt(m[1], 16);
                let total = 0x4000;
                if (sectionType.startsWith("WRAM"))
                    total = 0x1000;
                else if (sectionType.startsWith("HRAM"))
                    total = 127;
                logFunction(`Space left: ${sectionType}[${bankNumber}]: ${space}  (${((space / total) *
                    100).toFixed(1)}%)`);
            }
        }
        logFunction("Build done");
        doneCallback(romFile, startAddress, addrToLine);
    }
}
const compiler = {
    compile: (options, onCompileDone, onCompileLog) => {
        doneCallback = onCompileDone;
        linkOptions = options !== null && options !== void 0 ? options : [];
        logCallback = onCompileLog !== null && onCompileLog !== void 0 ? onCompileLog : null;
        if (busy) {
            repeat = true;
        }
        else {
            busy = true;
            trigger();
        }
    },
    getErrors: () => errorList,
    getRomSymbols: () => romSymbols,
    getRamSymbols: () => ramSymbols,
};
exports["default"] = compiler;


/***/ }),

/***/ 93570:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const WasmModuleWrapper_1 = __webpack_require__(31526);
let emu;
let romPtr;
let romSize = 0;
let audioCtx;
let audioTime;
const audioBufferSize = 2048;
/* see:
  https://gist.github.com/surma/b2705b6cca29357ebea1c9e6e15684cc
  https://github.com/webpack/webpack/issues/7352
*/
const locateFile = (module) => (path) => {
    if (path.endsWith(".wasm")) {
        return module;
    }
    return path;
};
let Module;
(0, WasmModuleWrapper_1.Binjgb)({
    locateFile: locateFile(WasmModuleWrapper_1.BinjgbModule),
}).then((module) => {
    Module = module;
});
const init = (romData) => {
    console.log("INIT EMULATOR");
    if (isAvailable())
        destroy();
    if (typeof audioCtx == "undefined")
        audioCtx = new AudioContext();
    let requiredSize = ((romData.length - 1) | 0x3fff) + 1;
    if (requiredSize < 0x8000)
        requiredSize = 0x8000;
    if (romSize < requiredSize) {
        if (typeof romPtr != "undefined")
            Module._free(romPtr);
        romPtr = Module._malloc(requiredSize);
        romSize = requiredSize;
    }
    for (let n = 0; n < romSize; n++)
        Module.HEAP8[romPtr + n] = 0;
    for (let n = 0; n < romData.length; n++)
        Module.HEAP8[romPtr + n] = romData[n];
    emu = Module._emulator_new_simple(romPtr, romSize, audioCtx.sampleRate, audioBufferSize);
    audioCtx.resume();
    audioTime = audioCtx.currentTime;
};
const updateRom = (romData) => {
    if (!isAvailable()) {
        console.log("UPDATE ROM: NOT AVAILABLE");
        return false;
    }
    let requiredSize = ((romData.length - 1) | 0x3fff) + 1;
    if (requiredSize < 0x8000)
        requiredSize = 0x8000;
    if (romSize < requiredSize)
        return false;
    for (let n = 0; n < romSize; n++)
        Module.HEAP8[romPtr + n] = 0;
    for (let n = 0; n < romData.length; n++)
        Module.HEAP8[romPtr + n] = romData[n];
    return true;
};
const destroy = () => {
    if (!isAvailable())
        return;
    Module._emulator_delete(emu);
    emu = undefined;
};
const isAvailable = () => typeof emu != "undefined";
const step = (stepType) => {
    if (!isAvailable())
        return;
    let ticks = Module._emulator_get_ticks_f64(emu);
    if (stepType === "single")
        ticks += 1;
    else if (stepType === "frame")
        ticks += 70224;
    while (true) {
        const result = Module._emulator_run_until_f64(emu, ticks);
        if (result & 2)
            processAudioBuffer();
        if (result & 8)
            // Breakpoint hit
            return true;
        if (result & 16)
            // Illegal instruction
            return true;
        if (result !== 2 && stepType !== "run")
            return false;
        if (stepType === "run") {
            if (result & 4) {
                // Sync to the audio buffer, make sure we have 100ms of audio data buffered.
                if (audioTime < audioCtx.currentTime + 0.1)
                    ticks += 70224;
                else
                    return false;
            }
        }
    }
};
const readMem = (addr) => {
    if (!isAvailable())
        return 0xff;
    return Module._emulator_read_mem(emu, addr);
};
const writeMem = (addr, data) => {
    if (!isAvailable()) {
        console.log("WRITE MEM NOT AVAILABLE");
        return;
    }
    console.log("WRITE MEM", addr, data);
    return Module._emulator_write_mem(emu, addr, data);
};
const setChannel = (channel, muted) => {
    if (!isAvailable())
        return muted;
    return Module._set_audio_channel_mute(emu, channel, muted);
};
function processAudioBuffer() {
    if (audioTime < audioCtx.currentTime)
        audioTime = audioCtx.currentTime;
    const inputBuffer = new Uint8Array(Module.HEAP8.buffer, Module._get_audio_buffer_ptr(emu), Module._get_audio_buffer_capacity(emu));
    const volume = 0.5;
    const buffer = audioCtx.createBuffer(2, audioBufferSize, audioCtx.sampleRate);
    const channel0 = buffer.getChannelData(0);
    const channel1 = buffer.getChannelData(1);
    for (let i = 0; i < audioBufferSize; i++) {
        channel0[i] = (inputBuffer[2 * i] * volume) / 255;
        channel1[i] = (inputBuffer[2 * i + 1] * volume) / 255;
    }
    const bufferSource = audioCtx.createBufferSource();
    bufferSource.buffer = buffer;
    bufferSource.connect(audioCtx.destination);
    bufferSource.start(audioTime);
    const bufferSec = audioBufferSize / audioCtx.sampleRate;
    audioTime += bufferSec;
}
const emulator = {
    init,
    writeMem,
    readMem,
    step,
    updateRom,
    setChannel,
};
exports["default"] = emulator;


/***/ }),

/***/ 95893:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.playNotePreview = void 0;
const emulator_1 = __importDefault(__webpack_require__(93570));
const constants_1 = __webpack_require__(33867);
let previewTimeoutId = null;
const playNotePreview = (note, type, instrument, square2, waves = []) => {
    console.log(note, instrument, square2);
    switch (type) {
        case "duty":
            previewDutyInstrument(note, instrument, square2);
            break;
        case "wave":
            previewWaveInstrument(note, instrument, waves);
            break;
        case "noise":
            previewNoiseInstrument(note, instrument);
            break;
        default:
            break;
    }
    if (previewTimeoutId) {
        clearTimeout(previewTimeoutId);
    }
    previewTimeoutId = setTimeout(() => {
        emulator_1.default.writeMem(constants_1.NR12, 0);
        emulator_1.default.writeMem(constants_1.NR22, 0);
        emulator_1.default.writeMem(constants_1.NR30, 0);
        emulator_1.default.writeMem(constants_1.NR42, 0);
    }, 2000);
};
exports.playNotePreview = playNotePreview;
function previewDutyInstrument(note, instrument, square2) {
    const noteFreq = constants_1.note2freq[note];
    if (!square2) {
        const regs = {
            NR10: "0" +
                bitpack(instrument.frequency_sweep_time, 3) +
                (instrument.frequency_sweep_shift < 0 ? 1 : 0) +
                bitpack(Math.abs(instrument.frequency_sweep_shift), 3),
            NR11: bitpack(instrument.duty_cycle, 2) +
                bitpack(instrument.length !== null && instrument.length !== 0
                    ? 64 - instrument.length
                    : 0, 6),
            NR12: bitpack(instrument.initial_volume, 4) +
                (instrument.volume_sweep_change > 0 ? 1 : 0) +
                bitpack(instrument.volume_sweep_change !== 0
                    ? 8 - Math.abs(instrument.volume_sweep_change)
                    : 0, 3),
            NR13: bitpack(noteFreq & 0b11111111, 8),
            NR14: "1" + // Initial
                (instrument.length !== null ? 1 : 0) +
                "000" +
                bitpack((noteFreq & 0b0000011100000000) >> 8, 3),
        };
        console.log("-------------");
        console.log(`NR10`, regs.NR10, parseInt(regs.NR10, 2));
        console.log(`NR11`, regs.NR11, parseInt(regs.NR11, 2));
        console.log(`NR12`, regs.NR12, parseInt(regs.NR12, 2));
        console.log(`NR13`, regs.NR13, parseInt(regs.NR13, 2));
        console.log(`NR14`, regs.NR14, parseInt(regs.NR14, 2));
        console.log("=============");
        emulator_1.default.writeMem(constants_1.NR10, parseInt(regs.NR10, 2));
        emulator_1.default.writeMem(constants_1.NR11, parseInt(regs.NR11, 2));
        emulator_1.default.writeMem(constants_1.NR12, parseInt(regs.NR12, 2));
        emulator_1.default.writeMem(constants_1.NR13, parseInt(regs.NR13, 2));
        emulator_1.default.writeMem(constants_1.NR14, parseInt(regs.NR14, 2));
    }
    else {
        const regs = {
            NR21: bitpack(instrument.duty_cycle, 2) +
                bitpack(instrument.length !== null && instrument.length !== 0
                    ? 64 - instrument.length
                    : 0, 6),
            NR22: bitpack(instrument.initial_volume, 4) +
                (instrument.volume_sweep_change > 0 ? 1 : 0) +
                bitpack(instrument.volume_sweep_change !== 0
                    ? 8 - Math.abs(instrument.volume_sweep_change)
                    : 0, 3),
            NR23: bitpack(noteFreq & 0b11111111, 8),
            NR24: "1" + // Initial
                (instrument.length !== null ? 1 : 0) +
                "000" +
                bitpack((noteFreq & 0b0000011100000000) >> 8, 3),
        };
        console.log("-------------");
        console.log(`NR21`, regs.NR21, parseInt(regs.NR21, 2));
        console.log(`NR22`, regs.NR22, parseInt(regs.NR22, 2));
        console.log(`NR23`, regs.NR23, parseInt(regs.NR23, 2));
        console.log(`NR24`, regs.NR24, parseInt(regs.NR24, 2));
        console.log("=============");
        emulator_1.default.writeMem(constants_1.NR21, parseInt(regs.NR21, 2));
        emulator_1.default.writeMem(constants_1.NR22, parseInt(regs.NR22, 2));
        emulator_1.default.writeMem(constants_1.NR23, parseInt(regs.NR23, 2));
        emulator_1.default.writeMem(constants_1.NR24, parseInt(regs.NR24, 2));
    }
}
function previewWaveInstrument(note, instrument, waves) {
    const noteFreq = constants_1.note2freq[note];
    const wave = waves[instrument.wave_index];
    for (let idx = 0; idx < 16; idx++) {
        emulator_1.default.writeMem(constants_1.AUD3_WAVE_RAM + idx, (wave[idx * 2] << 4) | wave[idx * 2 + 1]);
    }
    const regs = {
        NR30: "1" + bitpack(0, 7),
        NR31: bitpack((instrument.length !== null ? 256 - instrument.length : 0) & 0xff, 8),
        NR32: "00" + bitpack(instrument.volume, 2) + "00000",
        NR33: bitpack(noteFreq & 0b11111111, 8),
        NR34: "1" + // Initial
            (instrument.length !== null ? 1 : 0) +
            "000" +
            bitpack((noteFreq & 0b0000011100000000) >> 8, 3),
    };
    console.log("-------------");
    console.log(`NR30`, regs.NR30, parseInt(regs.NR30, 2));
    console.log(`NR31`, regs.NR31, parseInt(regs.NR31, 2));
    console.log(`NR32`, regs.NR32, parseInt(regs.NR32, 2));
    console.log(`NR33`, regs.NR33, parseInt(regs.NR33, 2));
    console.log(`NR34`, regs.NR34, parseInt(regs.NR34, 2));
    console.log("=============");
    emulator_1.default.writeMem(constants_1.NR30, parseInt(regs.NR30, 2));
    emulator_1.default.writeMem(constants_1.NR31, parseInt(regs.NR31, 2));
    emulator_1.default.writeMem(constants_1.NR32, parseInt(regs.NR32, 2));
    emulator_1.default.writeMem(constants_1.NR33, parseInt(regs.NR33, 2));
    emulator_1.default.writeMem(constants_1.NR34, parseInt(regs.NR34, 2));
    return regs;
}
function previewNoiseInstrument(note, instrument) {
    const regs = {
        NR41: "00" +
            bitpack(instrument.length !== null ? 64 - instrument.length : 0, 6),
        NR42: bitpack(instrument.initial_volume, 4) +
            (instrument.volume_sweep_change > 0 ? 1 : 0) +
            bitpack(instrument.volume_sweep_change !== 0
                ? 8 - Math.abs(instrument.volume_sweep_change)
                : 0, 3),
        NR43: bitpack(note2noise(note) + (instrument.bit_count === 7 ? 8 : 0), 8),
        NR44: "1" + // Initial
            (instrument.length !== null ? 1 : 0) +
            "000000",
    };
    emulator_1.default.step("frame");
    let noiseStep = 0;
    const noiseTimer = setInterval(() => {
        if (noiseStep > 5) {
            clearInterval(noiseTimer);
            return;
        }
        console.log("noise macro step = " + noiseStep);
        emulator_1.default.writeMem(constants_1.NR43, note2noise(note) + (instrument.bit_count === 7 ? 8 : 0));
        noiseStep++;
    }, 1000 / 64);
    console.log("-------------");
    console.log(`NR41`, regs.NR41, parseInt(regs.NR41, 2));
    console.log(`NR42`, regs.NR42, parseInt(regs.NR42, 2));
    console.log(`NR43`, regs.NR43, parseInt(regs.NR43, 2));
    console.log(`NR44`, regs.NR44, parseInt(regs.NR44, 2));
    console.log("=============");
    emulator_1.default.writeMem(constants_1.NR41, parseInt(regs.NR41, 2));
    emulator_1.default.writeMem(constants_1.NR42, parseInt(regs.NR42, 2));
    emulator_1.default.writeMem(constants_1.NR43, parseInt(regs.NR43, 2));
    emulator_1.default.writeMem(constants_1.NR44, parseInt(regs.NR44, 2));
}
const bitpack = (value, bitResolution) => {
    const bitsString = Math.abs(value || 0).toString(2);
    let missingValues = "";
    for (let i = 0; i < bitResolution - bitsString.length; i++) {
        missingValues = missingValues + "0";
    }
    return missingValues + bitsString.slice(0, bitResolution);
};
const note2noise = (note) => {
    // https://docs.google.com/spreadsheets/d/1O9OTAHgLk1SUt972w88uVHp44w7HKEbS/edit#gid=75028951
    // if A > 7 then begin
    //   B := (A-4) div 4;
    //   C := (A mod 4)+4;
    //   A := (C or (B shl 4))
    // end;
    const pitch = 64 > note ? 63 - note : 192 + note;
    return pitch > 7 ? (((pitch - 4) >> 2) << 4) + (pitch & 3) + 4 : pitch;
};


/***/ }),

/***/ 89168:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const compiler_1 = __importDefault(__webpack_require__(144));
const storage_1 = __importDefault(__webpack_require__(57572));
const emulator_1 = __importDefault(__webpack_require__(93570));
const _8bit_1 = __webpack_require__(39189);
let currentSong = null;
let onSongProgressIntervalId;
let romFile;
let currentSequence = -1;
let currentRow = -1;
const channels = [false, false, false, false];
let onIntervalCallback = (_updateData) => { };
const getRamAddress = (sym) => {
    return compiler_1.default.getRamSymbols().indexOf(sym);
};
const getRomAddress = (sym) => {
    return compiler_1.default.getRomSymbols().indexOf(sym);
};
const isPlayerPaused = () => {
    const isPlayerPausedAddr = getRamAddress("is_player_paused");
    return emulator_1.default.readMem(isPlayerPausedAddr) === 1;
};
const doPause = () => {
    const _if = emulator_1.default.readMem(0xff0f);
    console.log(_if);
    emulator_1.default.writeMem(0xff0f, _if | 0b00001000);
    console.log(emulator_1.default.readMem(0xff0f));
    while (!isPlayerPaused()) {
        console.log("PAUSING...");
        emulator_1.default.step("frame");
    }
    console.log("PAUSED");
};
const doResume = () => {
    const doResumePlayerAddr = getRamAddress("do_resume_player");
    emulator_1.default.writeMem(doResumePlayerAddr, 1);
    while (isPlayerPaused()) {
        console.log("RESUMING...");
        emulator_1.default.step("frame");
    }
    console.log("RESUMED");
};
const initPlayer = (onInit, sfx) => {
    // Load an empty song
    let songFile = `include "include/hUGE.inc"
    
 SECTION "song", ROM0[$1000]
 
 SONG_DESCRIPTOR::
 db 7  ; tempo
 dw song_order_cnt
 dw song_order1, song_order1, song_order1, song_order1
 dw 0, 0, 0
 dw 0
 dw 0
 
 song_order_cnt: db 1
 song_order1: dw P0
 
 P0:
  dn ___,0,$B01
  
 `;
    if (sfx) {
        songFile += `my_sfx:: db ${sfx}`;
    }
    storage_1.default.update("song.asm", songFile);
    const onCompileDone = (file) => {
        if (!file)
            return;
        romFile = file;
        if (onInit) {
            onInit(file);
        }
        emulator_1.default.init(romFile);
        const doResumePlayerAddr = getRamAddress("do_resume_player");
        const updateTracker = () => {
            emulator_1.default.step("run");
            console.log("RUN", `Is Player Paused: ${isPlayerPaused()}`, `Do resume Player: ${emulator_1.default.readMem(doResumePlayerAddr)}`, `OxFF0F: ${emulator_1.default.readMem(0xff0f)}`, `Order Count: ${emulator_1.default.readMem(getRamAddress("order_cnt"))}`);
        };
        setInterval(updateTracker, 1000 / 64);
    };
    compiler_1.default.compile(["-t", "-w"], onCompileDone, console.log);
};
const setChannel = (channel, muted) => {
    channels[channel] = emulator_1.default.setChannel(channel, muted);
    return channels;
};
const loadSong = (song) => {
    updateRom(song);
    emulator_1.default.step("frame");
    stop();
};
const loadSound = (sfx) => {
    // Load an empty song
    let songFile = `include "include/hUGE.inc"
    
 SECTION "song", ROM0[$1000]
 
 SONG_DESCRIPTOR::
 db 7  ; tempo
 dw song_order_cnt
 dw song_order1, song_order1, song_order1, song_order1
 dw 0, 0, 0
 dw 0
 dw 0
 
 song_order_cnt: db 1
 song_order1: dw P0
 
 P0:
  dn ___,0,$B01
  
 `;
    if (sfx) {
        songFile += `my_sfx:: db ${sfx}`;
    }
    storage_1.default.update("song.asm", songFile);
    const onCompileDone = (file) => {
        if (!file)
            return;
        romFile = file;
        emulator_1.default.init(romFile);
        playSound();
    };
    compiler_1.default.compile(["-t", "-w"], onCompileDone, console.log);
};
const play = (song, position) => {
    console.log("PLAY");
    updateRom(song);
    emulator_1.default.step("frame");
    stop();
    if (position) {
        console.log("POS", position);
        setStartPosition(position);
    }
    const ticksPerRowAddr = getRamAddress("ticks_per_row");
    emulator_1.default.writeMem(ticksPerRowAddr, song.ticks_per_row);
    if (isPlayerPaused()) {
        emulator_1.default.setChannel(0, channels[0]);
        emulator_1.default.setChannel(1, channels[1]);
        emulator_1.default.setChannel(2, channels[2]);
        emulator_1.default.setChannel(3, channels[3]);
        const currentOrderAddr = getRamAddress("current_order");
        const rowAddr = getRamAddress("row");
        const orderCntAddr = getRamAddress("order_cnt");
        emulator_1.default.writeMem(orderCntAddr, song.sequence.length * 2);
        doResume();
        const updateUI = () => {
            const oldRow = currentRow;
            currentSequence = emulator_1.default.readMem(currentOrderAddr) / 2;
            currentRow = emulator_1.default.readMem(rowAddr);
            if (oldRow !== currentRow) {
                console.log(`Sequence: ${currentSequence}, Row: ${currentRow}`);
                onIntervalCallback([currentSequence, currentRow]);
            }
        };
        onSongProgressIntervalId = setInterval(updateUI, 1000 / 64);
    }
};
const playSound = () => {
    doPause();
    console.log("=======SFX=======");
    const mySfxAddr = getRomAddress("my_sfx");
    const sfxPlayBankAddr = getRamAddress("_sfx_play_bank");
    const sfxPlaySampleAddr = getRamAddress("_sfx_play_sample");
    console.log(mySfxAddr, emulator_1.default.readMem(sfxPlayBankAddr), emulator_1.default.readMem(sfxPlaySampleAddr), emulator_1.default.readMem(sfxPlaySampleAddr + 1), sfxPlaySampleAddr, sfxPlayBankAddr);
    emulator_1.default.writeMem(sfxPlayBankAddr, 1);
    emulator_1.default.writeMem(sfxPlaySampleAddr, (0, _8bit_1.lo)(mySfxAddr));
    emulator_1.default.writeMem(sfxPlaySampleAddr + 1, (0, _8bit_1.hi)(mySfxAddr));
    const b0 = emulator_1.default.readMem(sfxPlaySampleAddr);
    const b1 = emulator_1.default.readMem(sfxPlaySampleAddr + 1);
    const v = (b1 << 8) | b0;
    console.log("SFX", v, b0, b1);
    console.log("=======SFX=======");
    doResume();
    const sfxUpdate = setInterval(() => {
        const b0 = emulator_1.default.readMem(sfxPlaySampleAddr);
        const b1 = emulator_1.default.readMem(sfxPlaySampleAddr + 1);
        const v = (b1 << 8) | b0;
        console.log("SFX", v, b0, b1);
        if (v === 0) {
            doPause();
            clearInterval(sfxUpdate);
        }
    }, 1000 / 64);
};
const stop = (position) => {
    console.log("STOP!");
    if (!isPlayerPaused()) {
        doPause();
    }
    if (position) {
        setStartPosition(position);
    }
    if (onSongProgressIntervalId) {
        clearInterval(onSongProgressIntervalId);
    }
    onSongProgressIntervalId = undefined;
};
const setStartPosition = (position) => {
    let wasPlaying = false;
    if (!isPlayerPaused()) {
        wasPlaying = true;
        doPause();
    }
    const newOrderAddr = getRamAddress("new_order");
    const newRowAddr = getRamAddress("new_row");
    const tickAddr = getRamAddress("tick");
    emulator_1.default.writeMem(newOrderAddr, position[0] * 2);
    emulator_1.default.writeMem(newRowAddr, position[1]);
    emulator_1.default.writeMem(tickAddr, 0);
    if (wasPlaying) {
        doResume();
    }
};
const updateRom = (song) => {
    currentSong = song;
    const addr = getRomAddress("SONG_DESCRIPTOR");
    patchRom(romFile, song, addr);
    emulator_1.default.updateRom(romFile);
};
function patchRom(targetRomFile, song, startAddr) {
    var _a, _b, _c;
    console.log("PATCH ROM");
    const buf = new Uint8Array(targetRomFile.buffer);
    let addr = startAddr;
    let headerIndex = addr;
    function writeCurrentAddress() {
        buf[headerIndex + 0] = addr & 0xff;
        buf[headerIndex + 1] = addr >> 8;
        headerIndex += 2;
    }
    // write ticks_per_row (1 byte)
    buf[addr] = song.ticks_per_row;
    headerIndex += 1; // move header index to the order_cnt pointer position
    addr += 1;
    /* skip the set of header indexes to:
      - order count (1 word)
      - orders (4 words)
      - instruments (3 words)
      - routines (1 word)
      - waves (1 word)
    */
    addr += 20;
    // write the order_cnt value in memory (1 byte)
    buf[addr] = song.sequence.length * 2;
    // write the address to the order_cnt in the order_cnt header index
    writeCurrentAddress();
    addr += 1;
    const ordersAddr = [];
    for (let n = 0; n < 4; n++) {
        // store the address to the order definition to use later
        ordersAddr.push(addr);
        // write the address in the orderN header index
        writeCurrentAddress();
        // skip the definition of the order (64 words)
        addr += 64 * 2;
    }
    const writeSubPatternCell = (cell, isLast) => {
        var _a, _b, _c, _d;
        const jump = cell.jump !== null && isLast ? 1 : ((_a = cell.jump) !== null && _a !== void 0 ? _a : 0);
        buf[addr++] = (_b = cell.note) !== null && _b !== void 0 ? _b : 90;
        buf[addr++] = (jump << 4) | ((_c = cell.effectcode) !== null && _c !== void 0 ? _c : 0);
        buf[addr++] = (_d = cell.effectparam) !== null && _d !== void 0 ? _d : 0;
    };
    const subpatternAddr = {};
    for (let n = 0; n < song.duty_instruments.length; n++) {
        const instr = song.duty_instruments[n];
        subpatternAddr[`DutySP${instr.index}`] = instr.subpattern_enabled
            ? addr
            : 0;
        const pattern = song.duty_instruments[n].subpattern;
        for (let idx = 0; idx < 32; idx++) {
            writeSubPatternCell(pattern[idx], idx === 32 - 1);
        }
    }
    for (let n = 0; n < song.wave_instruments.length; n++) {
        const instr = song.wave_instruments[n];
        subpatternAddr[`WaveSP${instr.index}`] = instr.subpattern_enabled
            ? addr
            : 0;
        const pattern = song.wave_instruments[n].subpattern;
        for (let idx = 0; idx < 32; idx++) {
            writeSubPatternCell(pattern[idx], idx === 32 - 1);
        }
    }
    for (let n = 0; n < song.noise_instruments.length; n++) {
        const instr = song.noise_instruments[n];
        subpatternAddr[`NoiseSP${instr.index}`] = instr.subpattern_enabled
            ? addr
            : 0;
        const pattern = song.noise_instruments[n].subpattern;
        for (let idx = 0; idx < 32; idx++) {
            writeSubPatternCell(pattern[idx], idx === 32 - 1);
        }
    }
    console.log(subpatternAddr);
    for (let n = 0; n < song.duty_instruments.length; n++) {
        const instr = song.duty_instruments[n];
        const sweep = (instr.frequency_sweep_time << 4) |
            (instr.frequency_sweep_shift < 0 ? 0x08 : 0x00) |
            Math.abs(instr.frequency_sweep_shift);
        const lenDuty = (instr.duty_cycle << 6) |
            ((instr.length !== null ? 64 - instr.length : 0) & 0x3f);
        let envelope = (instr.initial_volume << 4) |
            (instr.volume_sweep_change > 0 ? 0x08 : 0x00);
        if (instr.volume_sweep_change !== 0)
            envelope |= 8 - Math.abs(instr.volume_sweep_change);
        const subpattern = (_a = subpatternAddr[`DutySP${instr.index}`]) !== null && _a !== void 0 ? _a : 0;
        const highmask = 0x80 | (instr.length !== null ? 0x40 : 0);
        buf[addr + n * (4 + 2) + 0] = sweep;
        buf[addr + n * (4 + 2) + 1] = lenDuty;
        buf[addr + n * (4 + 2) + 2] = envelope;
        buf[addr + n * (4 + 2) + 3] = subpattern & 0xff;
        buf[addr + n * (4 + 2) + 4] = subpattern >> 8;
        buf[addr + n * (4 + 2) + 5] = highmask;
    }
    // write the pointer to the duty instruments to the first instruments header index
    writeCurrentAddress();
    // skip the duty instruments definition (16 * (3 bytes + 1 word + 1 byte) per instrument)
    addr += 16 * (4 + 2);
    for (let n = 0; n < song.wave_instruments.length; n++) {
        const instr = song.wave_instruments[n];
        const length = (instr.length !== null ? 256 - instr.length : 0) & 0xff;
        const volume = instr.volume << 5;
        const waveForm = instr.wave_index;
        const subpattern = (_b = subpatternAddr[`WaveSP${instr.index}`]) !== null && _b !== void 0 ? _b : 0;
        const highmask = 0x80 | (instr.length !== null ? 0x40 : 0);
        buf[addr + n * (4 + 2) + 0] = length;
        buf[addr + n * (4 + 2) + 1] = volume;
        buf[addr + n * (4 + 2) + 2] = waveForm;
        buf[addr + n * (4 + 2) + 3] = subpattern & 0xff;
        buf[addr + n * (4 + 2) + 4] = subpattern >> 8;
        buf[addr + n * (4 + 2) + 5] = highmask;
    }
    // write the pointer to the wave instruments to the second instruments header index
    writeCurrentAddress();
    // skip the wave instruments definition (16 * (3 bytes + 1 word + 1 byte) per instrument)
    addr += 16 * (4 + 2);
    for (let n = 0; n < song.noise_instruments.length; n++) {
        const instr = song.noise_instruments[n];
        let envelope = (instr.initial_volume << 4) |
            (instr.volume_sweep_change > 0 ? 0x08 : 0x00);
        if (instr.volume_sweep_change !== 0)
            envelope |= 8 - Math.abs(instr.volume_sweep_change);
        const subpattern = (_c = subpatternAddr[`NoiseSP${instr.index}`]) !== null && _c !== void 0 ? _c : 0;
        let highmask = (instr.length !== null ? 64 - instr.length : 0) & 0x3f;
        if (instr.length !== null)
            highmask |= 0x40;
        if (instr.bit_count === 7)
            highmask |= 0x80;
        buf[addr + n * (4 + 2) + 0] = envelope;
        buf[addr + n * (4 + 2) + 1] = subpattern & 0xff;
        buf[addr + n * (4 + 2) + 2] = subpattern >> 8;
        buf[addr + n * (4 + 2) + 3] = highmask;
        buf[addr + n * (4 + 2) + 4] = 0;
        buf[addr + n * (4 + 2) + 5] = 0;
    }
    // write the pointer to the noise instruments to the third instruments header index
    writeCurrentAddress();
    // skip the noise instruments definition (16 * (1 byte + 1 word + 3 bytes) per instrument)
    addr += 16 * (4 + 2);
    // write 0 to the routines header index
    buf[headerIndex + 0] = 0;
    buf[headerIndex + 1] = 0;
    headerIndex += 2;
    for (let n = 0; n < song.waves.length; n++) {
        for (let idx = 0; idx < 16; idx++)
            buf[addr + n * 16 + idx] =
                (song.waves[n][idx * 2] << 4) | song.waves[n][idx * 2 + 1];
    }
    // write the pointer to the waves definition to the waves header index
    writeCurrentAddress();
    addr += 16 * 16;
    for (let track = 0; track < 4; track++) {
        const patternAddr = [];
        for (let n = 0; n < song.patterns.length; n++) {
            const pattern = song.patterns[n];
            patternAddr.push(addr);
            for (let idx = 0; idx < pattern.length; idx++) {
                const cell = pattern[idx][track];
                buf[addr++] = cell.note !== null ? cell.note : 90;
                buf[addr++] =
                    ((cell.instrument !== null ? cell.instrument + 1 : 0) << 4) |
                        (cell.effectcode !== null ? cell.effectcode : 0);
                buf[addr++] = cell.effectparam !== null ? cell.effectparam : 0;
            }
        }
        let orderAddr = ordersAddr[track];
        for (let n = 0; n < song.sequence.length; n++) {
            buf[orderAddr++] = patternAddr[song.sequence[n]] & 0xff;
            buf[orderAddr++] = patternAddr[song.sequence[n]] >> 8;
        }
    }
}
const getCurrentSong = () => currentSong;
const reset = () => emulator_1.default.init(romFile);
const player = {
    initPlayer,
    loadSong,
    loadSound,
    play,
    playSound,
    stop,
    setChannel,
    setStartPosition,
    getCurrentSong,
    setOnIntervalCallback: (cb) => {
        onIntervalCallback = cb;
    },
    reset,
};
exports["default"] = player;


/***/ }),

/***/ 57572:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-webpack-loader-syntax */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const hardware_inc_1 = __importDefault(__webpack_require__(10727));
const hUGEDriver_asm_1 = __importDefault(__webpack_require__(53326));
const hUGE_inc_1 = __importDefault(__webpack_require__(83810));
const hUGE_note_table_inc_1 = __importDefault(__webpack_require__(80292));
const player_asm_1 = __importDefault(__webpack_require__(42242));
const files = {
    "include/hardware.inc": hardware_inc_1.default,
    "include/hUGE.inc": hUGE_inc_1.default,
    "include/hUGE_note_table.inc": hUGE_note_table_inc_1.default,
    "hUGEDriver.asm": hUGEDriver_asm_1.default,
    "player.asm": player_asm_1.default,
};
const getFiles = () => files;
const update = (name, code) => {
    if (typeof name !== "undefined") {
        if (code === null) {
            delete files[name];
        }
        else if (code instanceof ArrayBuffer) {
            files[name] = new Uint8Array(code);
        }
        else {
            files[name] = code;
        }
    }
    localStorage.rgbds_storage = JSON.stringify(files);
};
const storage = {
    update,
    getFiles,
};
exports["default"] = storage;


/***/ }),

/***/ 49495:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const API = window.API;
exports["default"] = API;


/***/ }),

/***/ 39189:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.roundUp8 = exports.roundUp16 = exports.roundDown16 = exports.roundDown8 = exports.convertHexTo15BitDec = exports.divisibleBy8 = exports.fromSigned8Bit = exports.lo = exports.hi = exports.hexDec = exports.decOct = exports.decHex32Val = exports.decHex16Val = exports.decHex16 = exports.decHexVal = exports.decHex = exports.decBin = exports.wrap32Bit = exports.clampSigned16Bit = exports.wrapSigned8Bit = exports.wrap16Bit = exports.wrap8Bit = exports.SIGNED_16BIT_MIN = exports.SIGNED_16BIT_MAX = void 0;
exports.SIGNED_16BIT_MAX = 32767;
exports.SIGNED_16BIT_MIN = -32768;
const wrap8Bit = (val) => (256 + (val % 256)) % 256;
exports.wrap8Bit = wrap8Bit;
const wrap16Bit = (val) => (65536 + (val % 65536)) % 65536;
exports.wrap16Bit = wrap16Bit;
const wrapSigned8Bit = (val) => {
    const u = (0, exports.wrap8Bit)(val);
    return u >= 128 ? u - 256 : u;
};
exports.wrapSigned8Bit = wrapSigned8Bit;
const clampSigned16Bit = (val) => Math.max(exports.SIGNED_16BIT_MIN, Math.min(exports.SIGNED_16BIT_MAX, val));
exports.clampSigned16Bit = clampSigned16Bit;
const wrap32Bit = (val) => (4294967296 + (val % 4294967296)) % 4294967296;
exports.wrap32Bit = wrap32Bit;
const decBin = (dec) => (0, exports.wrap8Bit)(dec).toString(2).padStart(8, "0");
exports.decBin = decBin;
const decHex = (dec) => `0x${(0, exports.wrap8Bit)(dec).toString(16).padStart(2, "0").toUpperCase()}`;
exports.decHex = decHex;
const decHexVal = (dec) => (0, exports.wrap8Bit)(dec).toString(16).padStart(2, "0").toUpperCase();
exports.decHexVal = decHexVal;
const decHex16 = (dec) => `0x${(0, exports.wrap16Bit)(dec).toString(16).padStart(4, "0").toUpperCase()}`;
exports.decHex16 = decHex16;
const decHex16Val = (dec) => (0, exports.wrap16Bit)(dec).toString(16).padStart(4, "0").toUpperCase();
exports.decHex16Val = decHex16Val;
const decHex32Val = (dec) => (0, exports.wrap32Bit)(dec).toString(16).padStart(8, "0").toUpperCase();
exports.decHex32Val = decHex32Val;
const decOct = (dec) => (0, exports.wrap8Bit)(dec).toString(8).padStart(3, "0");
exports.decOct = decOct;
const hexDec = (hex) => parseInt(hex, 16);
exports.hexDec = hexDec;
const hi = (longNum) => (0, exports.wrap16Bit)(longNum) >> 8;
exports.hi = hi;
const lo = (longNum) => (0, exports.wrap16Bit)(longNum) % 256;
exports.lo = lo;
const fromSigned8Bit = (num) => {
    const masked = num & 0xff;
    if (masked & 0x80) {
        return masked - 0x100;
    }
    else {
        return masked;
    }
};
exports.fromSigned8Bit = fromSigned8Bit;
const divisibleBy8 = (n) => (n >> 3) << 3 === n;
exports.divisibleBy8 = divisibleBy8;
const convertHexTo15BitDec = (hex) => {
    const r = Math.floor((0, exports.hexDec)(hex.substring(0, 2)) * (32 / 256));
    const g = Math.floor((0, exports.hexDec)(hex.substring(2, 4)) * (32 / 256));
    const b = Math.max(1, Math.floor((0, exports.hexDec)(hex.substring(4, 6)) * (32 / 256)));
    return (b << 10) + (g << 5) + r;
};
exports.convertHexTo15BitDec = convertHexTo15BitDec;
const roundDown8 = (v) => 8 * Math.floor(v / 8);
exports.roundDown8 = roundDown8;
const roundDown16 = (v) => 16 * Math.floor(v / 16);
exports.roundDown16 = roundDown16;
const roundUp16 = (x) => Math.ceil(x / 16) * 16;
exports.roundUp16 = roundUp16;
const roundUp8 = (x) => Math.ceil(x / 8) * 8;
exports.roundUp8 = roundUp8;


/***/ }),

/***/ 33867:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AUD3_WAVE_RAM = exports.NR44 = exports.NR43 = exports.NR42 = exports.NR41 = exports.NR34 = exports.NR33 = exports.NR32 = exports.NR31 = exports.NR30 = exports.NR24 = exports.NR23 = exports.NR22 = exports.NR21 = exports.NR14 = exports.NR13 = exports.NR12 = exports.NR11 = exports.NR10 = exports.note2freq = exports.noteStringsForClipboard = exports.noteGBDKDefines = void 0;
// prettier-ignore
exports.noteGBDKDefines = [
    "C_3", "Cs3", "D_3", "Ds3", "E_3", "F_3", "Fs3", "G_3", "Gs3", "A_3", "As3", "B_3", "C_4", "Cs4", "D_4", "Ds4", "E_4", "F_4", "Fs4", "G_4", "Gs4", "A_4", "As4", "B_4", "C_5", "Cs5", "D_5", "Ds5", "E_5", "F_5", "Fs5", "G_5", "Gs5", "A_5", "As5", "B_5", "C_6", "Cs6", "D_6", "Ds6", "E_6", "F_6", "Fs6", "G_6", "Gs6", "A_6", "As6", "B_6", "C_7", "Cs7", "D_7", "Ds7", "E_7", "F_7", "Fs7", "G_7", "Gs7", "A_7", "As7", "B_7", "C_8", "Cs8", "D_8", "Ds8", "E_8", "F_8", "Fs8", "G_8", "Gs8", "A_8", "As8", "B_8"
];
// prettier-ignore
exports.noteStringsForClipboard = [
    "C-3", "C#3", "D-3", "D#3", "E-3", "F-3", "F#3", "G-3", "G#3", "A-3", "A#3", "B-3", "C-4", "C#4", "D-4", "D#4", "E-4", "F-4", "F#4", "G-4", "G#4", "A-4", "A#4", "B-4", "C-5", "C#5", "D-5", "D#5", "E-5", "F-5", "F#5", "G-5", "G#5", "A-5", "A#5", "B-5", "C-6", "C#6", "D-6", "D#6", "E-6", "F-6", "F#6", "G-6", "G#6", "A-6", "A#6", "B-6", "C-7", "C#7", "D-7", "D#7", "E-7", "F-7", "F#7", "G-7", "G#7", "A-7", "A#7", "B-7", "C-8", "C#8", "D-8", "D#8", "E-8", "F-8", "F#8", "G-8", "G#8", "A-8", "A#8", "B-8",
];
exports.note2freq = [
    /*C_3*/ 44, /*Cs3*/ 156, /*D_3*/ 262, /*Ds3*/ 363, /*E_3*/ 457, /*F_3*/ 547,
    /*Fs3*/ 631, /*G_3*/ 710, /*Gs3*/ 786, /*A_3*/ 854, /*As3*/ 923, /*B_3*/ 986,
    /*C_4*/ 1046, /*Cs4*/ 1102, /*D_4*/ 1155, /*Ds4*/ 1205, /*E_4*/ 1253,
    /*F_4*/ 1297, /*Fs4*/ 1339, /*G_4*/ 1379, /*Gs4*/ 1417, /*A_4*/ 1452,
    /*As4*/ 1486, /*B_4*/ 1517, /*C_5*/ 1546, /*Cs5*/ 1575, /*D_5*/ 1602,
    /*Ds5*/ 1627, /*E_5*/ 1650, /*F_5*/ 1673, /*Fs5*/ 1694, /*G_5*/ 1714,
    /*Gs5*/ 1732, /*A_5*/ 1750, /*As5*/ 1767, /*B_5*/ 1783, /*C_6*/ 1798,
    /*Cs6*/ 1812, /*D_6*/ 1825, /*Ds6*/ 1837, /*E_6*/ 1849, /*F_6*/ 1860,
    /*Fs6*/ 1871, /*G_6*/ 1881, /*Gs6*/ 1890, /*A_6*/ 1899, /*As6*/ 1907,
    /*B_6*/ 1915, /*C_7*/ 1923, /*Cs7*/ 1930, /*D_7*/ 1936, /*Ds7*/ 1943,
    /*E_7*/ 1949, /*F_7*/ 1954, /*Fs7*/ 1959, /*G_7*/ 1964, /*Gs7*/ 1969,
    /*A_7*/ 1974, /*As7*/ 1978, /*B_7*/ 1982, /*C_8*/ 1985, /*Cs8*/ 1988,
    /*D_8*/ 1992, /*Ds8*/ 1995, /*E_8*/ 1998, /*F_8*/ 2001, /*Fs8*/ 2004,
    /*G_8*/ 2006, /*Gs8*/ 2009, /*A_8*/ 2011, /*As8*/ 2013, /*B_8*/ 2015,
];
// Sound controller registers
exports.NR10 = 0xff10;
exports.NR11 = 0xff11;
exports.NR12 = 0xff12;
exports.NR13 = 0xff13;
exports.NR14 = 0xff14;
exports.NR21 = 0xff16;
exports.NR22 = 0xff17;
exports.NR23 = 0xff18;
exports.NR24 = 0xff19;
exports.NR30 = 0xff1a;
exports.NR31 = 0xff1b;
exports.NR32 = 0xff1c;
exports.NR33 = 0xff1d;
exports.NR34 = 0xff1e;
exports.NR41 = 0xff20;
exports.NR42 = 0xff21;
exports.NR43 = 0xff22;
exports.NR44 = 0xff23;
exports.AUD3_WAVE_RAM = 0xff30;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			171: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(68739);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map