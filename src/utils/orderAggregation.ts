import type { MeetingRecord, MeetingResponse, OrderMenuItem } from '../types/meeting';

export interface OrderSummaryItem {
  menuItemId: string;
  name: string;
  price?: number;
  totalQuantity: number;
  totalPrice?: number;
  participants: Array<{
    nickname: string;
    quantity: number;
    note?: string;
  }>;
}

export interface OrderAggregationResult {
  items: OrderSummaryItem[];
  grandTotalQuantity: number;
  grandTotalPrice: number;
}

export const aggregateOrderResponses = (
  meeting: MeetingRecord | null,
  responses: MeetingResponse[]
): OrderAggregationResult => {
  if (!meeting || !meeting.orderMenuItems || meeting.orderMenuItems.length === 0) {
    return { items: [], grandTotalQuantity: 0, grandTotalPrice: 0 };
  }

  const menuItemsMap = new Map<string, OrderMenuItem>();
  meeting.orderMenuItems.forEach((item) => {
    menuItemsMap.set(item.id, item);
  });

  const aggregationMap = new Map<string, OrderSummaryItem>();

  // Pre-initialize map with all known menu items to preserve sequence or metadata.
  meeting.orderMenuItems.forEach((item) => {
    aggregationMap.set(item.id, {
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      totalQuantity: 0,
      totalPrice: 0,
      participants: [],
    });
  });

  responses.forEach((resp) => {
    if (!resp.orderSelections || resp.orderSelections.length === 0) return;

    resp.orderSelections.forEach((sel) => {
      const summaryItem = aggregationMap.get(sel.menuItemId);
      if (summaryItem) {
        summaryItem.totalQuantity += sel.quantity;
        if (summaryItem.price !== undefined) {
          summaryItem.totalPrice = (summaryItem.totalPrice || 0) + (summaryItem.price * sel.quantity);
        }
        summaryItem.participants.push({
          nickname: resp.nickname,
          quantity: sel.quantity,
          note: resp.orderNote || undefined,
        });
      }
    });
  });

  const items = Array.from(aggregationMap.values()).filter((item) => item.totalQuantity > 0);

  const grandTotalQuantity = items.reduce((sum, item) => sum + item.totalQuantity, 0);
  const grandTotalPrice = items.reduce((sum, item) => sum + (item.totalPrice || 0), 0);

  return {
    items,
    grandTotalQuantity,
    grandTotalPrice,
  };
};
