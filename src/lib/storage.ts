import { Room } from "@/data/rooms";

const STORAGE_KEYS = {
  bookings: "foresthaven_bookings",
  rooms: "foresthaven_rooms",
};

export interface Booking {
  id: string;
  nama: string;
  wa: string;
  kamar: string;
  kamarId: string;
  checkIn: string;
  checkOut: string;
  tamu: number;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  totalHarga: number;
}

export function getStoredBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEYS.bookings);
  return stored ? JSON.parse(stored) : [];
}

export function saveBooking(booking: Booking): void {
  const bookings = getStoredBookings();
  bookings.unshift(booking);
  localStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify(bookings));
}

export function updateBookingStatus(id: string, status: "approved" | "rejected"): void {
  const bookings = getStoredBookings();
  const updated = bookings.map((b) => (b.id === id ? { ...b, status } : b));
  localStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify(updated));
}

export function deleteBooking(id: string): void {
  const bookings = getStoredBookings();
  const filtered = bookings.filter((b) => b.id !== id);
  localStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify(filtered));
}

export function getStoredRooms(): Room[] | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEYS.rooms);
  return stored ? JSON.parse(stored) : null;
}

export function saveStoredRooms(rooms: Room[]): void {
  localStorage.setItem(STORAGE_KEYS.rooms, JSON.stringify(rooms));
}

export function initStoredData(rooms: Room[]): void {
  if (typeof window === "undefined") return;
  if (!localStorage.getItem(STORAGE_KEYS.rooms)) {
    localStorage.setItem(STORAGE_KEYS.rooms, JSON.stringify(rooms));
  }
}