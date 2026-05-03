import { storage } from "../utils/storage";

const BASE_URL = "http://localhost:3000";

function handle401(response) {
  if (response.status === 401) {
    storage.remove("token");
    storage.remove("authUser");
    window.location.href = "/login";
  }
  return response;
}

async function apiFetch(endpoint, options = {}) {
  const token = storage.get("token");
  const headers = { "Content-Type": "application/json", ...options.headers };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  handle401(res);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || err.error || "Error en la solicitud");
  }
  return res.json();
}

export function login(credentials) {
  return apiFetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

// ── Users (Admin) ────────────────────────────────────────────────────────
export function getUsers() {
  return apiFetch("/api/users");
}
export function getUserById(id) {
  return apiFetch(`/api/users/${id}`);
}
export function updateUser(id, data) {
  return apiFetch(`/api/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export function loginUser({ email, password }) {
  return apiFetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function registerUser({ nombre, email, password }) {
  return apiFetch("/api/users/registro", {
    method: "POST",
    body: JSON.stringify({ nombre, email, password }),
  });
}

export function getSpaces() {
  return apiFetch("/api/spaces");
}
export function getSpaceById(id) {
  return apiFetch(`/api/spaces/${id}`);
}
export function createSpace(data) {
  return apiFetch("/api/spaces", { method: "POST", body: JSON.stringify(data) });
}
export function updateSpace(id, data) {
  return apiFetch(`/api/spaces/${id}`, { method: "PUT", body: JSON.stringify(data) });
}
export function deleteSpace(id) {
  return apiFetch(`/api/spaces/${id}`, { method: "DELETE" });
}

export function getReservations() {
  return apiFetch("/api/reservations");
}
export function getReservationById(id) {
  return apiFetch(`/api/reservations/${id}`);
}
export function createReservation(data) {
  return apiFetch("/api/reservations", { method: "POST", body: JSON.stringify(data) });
}
export function updateReservation(id, data) {
  return apiFetch(`/api/reservations/${id}`, { method: "PUT", body: JSON.stringify(data) });
}
export function deleteReservation(id) {
  return apiFetch(`/api/reservations/${id}`, { method: "DELETE" });
}

export function getReviews() {
  return apiFetch("/api/reviews");
}
export function getReviewById(id) {
  return apiFetch(`/api/reviews/${id}`);
}
export function createReview(data) {
  return apiFetch("/api/reviews", { method: "POST", body: JSON.stringify(data) });
}
export function updateReview(id, data) {
  return apiFetch(`/api/reviews/${id}`, { method: "PUT", body: JSON.stringify(data) });
}
export function deleteReview(id) {
  return apiFetch(`/api/reviews/${id}`, { method: "DELETE" });
}

export function getPayments() {
  return apiFetch("/api/payments");
}
export function getPaymentById(id) {
  return apiFetch(`/api/payments/${id}`);
}
export function createPayment(data) {
  return apiFetch("/api/payments", { method: "POST", body: JSON.stringify(data) });
}
export function updatePayment(id, data) {
  return apiFetch(`/api/payments/${id}`, { method: "PUT", body: JSON.stringify(data) });
}
export function deletePayment(id) {
  return apiFetch(`/api/payments/${id}`, { method: "DELETE" });
}

export function getLocations() {
  return apiFetch("/api/locations");
}
export function getLocationById(id) {
  return apiFetch(`/api/locations/${id}`);
}
export function createLocation(data) {
  return apiFetch("/api/locations", { method: "POST", body: JSON.stringify(data) });
}
export function updateLocation(id, data) {
  return apiFetch(`/api/locations/${id}`, { method: "PUT", body: JSON.stringify(data) });
}
export function deleteLocation(id) {
  return apiFetch(`/api/locations/${id}`, { method: "DELETE" });
}

// ── Cards ─────────────────────────────────────────────────────────────────
export function getCards() {
  return apiFetch("/api/cards");
}
export function addCard(data) {
  return apiFetch("/api/cards", { method: "POST", body: JSON.stringify(data) });
}
export function setDefaultCard(id) {
  return apiFetch(`/api/cards/${id}/default`, { method: "PUT" });
}
export function removeCard(id) {
  return apiFetch(`/api/cards/${id}`, { method: "DELETE" });
}

// ── Support Tickets ───────────────────────────────────────────────────────
export function getSupportTickets() {
  return apiFetch("/api/support");
}
export function getSupportTicketById(id) {
  return apiFetch(`/api/support/${id}`);
}
export function createSupportTicket(data) {
  return apiFetch("/api/support", { method: "POST", body: JSON.stringify(data) });
}
export function updateTicketStatus(id, status) {
  return apiFetch(`/api/support/${id}/status`, { method: "PUT", body: JSON.stringify({ status }) });
}
export function respondTicket(id, data) {
  return apiFetch(`/api/support/${id}/respond`, { method: "PUT", body: JSON.stringify(data) });
}

// ── Invoices ─────────────────────────────────────────────────────────────
export function getInvoices() {
  return apiFetch("/api/invoices");
}
export function getInvoiceById(id) {
  return apiFetch(`/api/invoices/${id}`);
}
export function createInvoice(data) {
  return apiFetch("/api/invoices", { method: "POST", body: JSON.stringify(data) });
}