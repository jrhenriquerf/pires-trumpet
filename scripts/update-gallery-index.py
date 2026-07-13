#!/usr/bin/env python3
"""Update data/gallery-index.json from albums declared in data/gallery.json.

Usage from the project root:
  python3 scripts/update-gallery-index.py

This keeps GitHub Pages compatible with albums whose `images` list is empty:
the browser reads data/gallery-index.json because static hosting cannot list folders.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VALID_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".JPG", ".JPEG", ".PNG", ".WEBP"}


def album_files(album: dict) -> list[str]:
    base = ROOT / album["path"]
    if not base.exists():
        return []
    iterator = base.rglob("*") if album.get("recursive", True) else base.iterdir()
    files: list[str] = []
    for path in iterator:
        if not path.is_file():
            continue
        if path.suffix not in VALID_EXTENSIONS:
            continue
        if ":Zone.Identifier" in path.name or "thumbs" in path.parts:
            continue
        files.append(path.relative_to(base).as_posix())
    return sorted(files, key=str.lower)


def main() -> None:
    gallery_path = ROOT / "data" / "gallery.json"
    index_path = ROOT / "data" / "gallery-index.json"
    gallery = json.loads(gallery_path.read_text(encoding="utf-8"))
    index = {album["path"]: album_files(album) for album in gallery.get("albums", []) if album.get("path")}
    index_path.write_text(json.dumps(index, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    total = sum(len(images) for images in index.values())
    print(f"Updated {index_path.relative_to(ROOT)}: {len(index)} albums, {total} images")


if __name__ == "__main__":
    main()
