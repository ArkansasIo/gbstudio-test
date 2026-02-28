/**
 * Inventory System Utilities
 */

import type { Inventory, InventoryItem, Item } from '../generated/types';
import { itemsById } from '../data/sampleItems';

export const addItemToInventory = (
  inventory: Inventory,
  itemId: string,
  quantity: number
): Inventory => {
  const item = itemsById[itemId];
  if (!item) return inventory;
  
  const existingItem = inventory.items.find(i => i.itemId === itemId);
  
  if (existingItem && item.stackable) {
    const newQuantity = Math.min(
      existingItem.quantity + quantity,
      item.maxStack
    );
    
    return {
      ...inventory,
      items: inventory.items.map(i =>
        i.itemId === itemId
          ? { ...i, quantity: newQuantity }
          : i
      ),
    };
  }
  
  if (!existingItem) {
    return {
      ...inventory,
      items: [...inventory.items, { itemId, quantity }],
    };
  }
  
  return inventory;
};

export const removeItemFromInventory = (
  inventory: Inventory,
  itemId: string,
  quantity: number
): Inventory => {
  return {
    ...inventory,
    items: inventory.items
      .map(i =>
        i.itemId === itemId
          ? { ...i, quantity: i.quantity - quantity }
          : i
      )
      .filter(i => i.quantity > 0),
  };
};

export const hasItem = (inventory: Inventory, itemId: string, quantity: number = 1): boolean => {
  const item = inventory.items.find(i => i.itemId === itemId);
  return item ? item.quantity >= quantity : false;
};

export const getInventoryWeight = (inventory: Inventory): number => {
  return inventory.items.reduce((total, item) => {
    const itemData = itemsById[item.itemId];
    return total + (itemData ? item.quantity : 0);
  }, 0);
};

export const isInventoryFull = (inventory: Inventory): boolean => {
  return getInventoryWeight(inventory) >= inventory.capacity;
};

export const sortInventory = (
  items: InventoryItem[],
  sortBy: 'name' | 'type' | 'rarity' | 'value'
): InventoryItem[] => {
  return [...items].sort((a, b) => {
    const itemA = itemsById[a.itemId];
    const itemB = itemsById[b.itemId];
    
    if (!itemA || !itemB) return 0;
    
    switch (sortBy) {
      case 'name':
        return itemA.name.localeCompare(itemB.name);
      case 'type':
        return itemA.type.localeCompare(itemB.type);
      case 'rarity':
        const rarityOrder = { common: 0, uncommon: 1, rare: 2, epic: 3, legendary: 4 };
        return rarityOrder[itemB.rarity] - rarityOrder[itemA.rarity];
      case 'value':
        return itemB.value - itemA.value;
      default:
        return 0;
    }
  });
};

export const filterInventory = (
  items: InventoryItem[],
  filter: string
): InventoryItem[] => {
  if (!filter) return items;
  
  const lowerFilter = filter.toLowerCase();
  return items.filter(item => {
    const itemData = itemsById[item.itemId];
    if (!itemData) return false;
    
    return (
      itemData.name.toLowerCase().includes(lowerFilter) ||
      itemData.description.toLowerCase().includes(lowerFilter) ||
      itemData.type.toLowerCase().includes(lowerFilter)
    );
  });
};
