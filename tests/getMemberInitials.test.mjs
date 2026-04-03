import assert from "node:assert/strict";
import test from "node:test";

import { getMemberInitials } from "../src/lib/getMemberInitials.ts";

test("returns an empty string for empty input", () => {
	assert.equal(getMemberInitials(""), "");
});

test("returns an empty string for whitespace-only input", () => {
	assert.equal(getMemberInitials("   "), "");
});

test("returns the first two letters for a single-word name", () => {
	assert.equal(getMemberInitials("Nora"), "NO");
});

test("returns the first and last initials for a two-word name", () => {
	assert.equal(getMemberInitials("Nora Hansen"), "NH");
});

test("returns the first and last initials for a multi-word name", () => {
	assert.equal(getMemberInitials("Nora Marie Hansen"), "NH");
});

test("trims and collapses whitespace before deriving initials", () => {
	assert.equal(getMemberInitials("  nora   hansen  "), "NH");
});
