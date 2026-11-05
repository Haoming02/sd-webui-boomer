import os
from dataclasses import dataclass
from typing import Optional

from modules import errors
from modules.script_callbacks import on_before_ui, on_ui_settings
from modules.scripts import basedir
from modules.shared import OptionInfo, opts

BASEDIR = basedir()
ASSETDIR = os.path.join(BASEDIR, "assets")
STYLE_CSS = os.path.join(BASEDIR, "style.css")
LEGACY_CACHE = os.path.join(BASEDIR, "cache.json")

SECTION = {"section": ("boomer", "Boomer"), "category_id": "ui"}


@dataclass(frozen=True)
class Option:
    key: str
    label: str
    default: bool
    css: Optional[str] = None


OPTIONS = (
    Option("bmr_rfr_style", 'Duplicate "Refresh Style" button', True),
    Option("bmr_sav_style", 'Add "Save Style" button', True),
    Option("bmr_send_btn", "Change the button icons back to texts", True),
    Option("bmr_fit", 'Revert gallery images from "Fill" to "Fit"', True, "fit.css"),
    Option("bmr_thumbs", 'Restore the old "thumbs" look of ExtraNetwork cards', True, "thumbs.css"),
    Option("bmr_enlarge", "Enlarge the ExtraNetwork cards when hovered", False, "enlarge.css"),
    Option("bmr_arrow", "Enlarge the arrow buttons in fullscreen image view", False, "arrow.css"),
)


def add_ui_settings():
    for option in OPTIONS:
        opts.add_option(option.key, OptionInfo(option.default, option.label, **SECTION))


def build_style_css() -> str:
    fragments = []

    for option in OPTIONS:
        if option.css is None or not getattr(opts, option.key, option.default):
            continue

        path = os.path.join(ASSETDIR, option.css)

        try:
            with open(path, encoding="utf-8") as fragment:
                css = fragment.read().strip()
        except OSError:
            errors.report(f"sd-webui-boomer: cannot read {path}", exc_info=True)
            continue

        if css:
            fragments.append(css)

    return "\n\n".join(fragments) + "\n" if fragments else ""


def drop_legacy_cache():
    try:
        os.remove(LEGACY_CACHE)
    except FileNotFoundError:
        pass


def update_style_css():
    drop_legacy_cache()

    css = build_style_css()

    try:
        with open(STYLE_CSS, encoding="utf-8") as current:
            if current.read() == css:
                return
    except FileNotFoundError:
        pass
    except OSError:
        errors.report(f"sd-webui-boomer: cannot read {STYLE_CSS}", exc_info=True)

    temporary = f"{STYLE_CSS}.tmp"

    try:
        with open(temporary, "w", encoding="utf-8") as file:
            file.write(css)
        os.replace(temporary, STYLE_CSS)
    except OSError:
        errors.report(f"sd-webui-boomer: cannot write {STYLE_CSS}", exc_info=True)


on_ui_settings(add_ui_settings)
on_before_ui(update_style_css)
