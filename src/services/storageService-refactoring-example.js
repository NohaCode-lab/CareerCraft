/* eslint-disable */
// BEFORE - in AuthContext.jsx:22
window.localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));

// AFTER
import { setItem } from "../services/storageService";
setItem(STORAGE_KEY, userData);

