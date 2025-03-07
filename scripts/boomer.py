from modules.script_callbacks import on_ui_settings, on_before_ui
from modules.shared import opts, OptionInfo
from modules.scripts import basedir
import os.path

STYLE_FIT = os.path.join(basedir(), "assets", "fit.css")
STYLE_ARROW = os.path.join(basedir(), "assets", "arrow.css")
STYLE_THUMBS = os.path.join(basedir(), "assets", "thumbs.css")
STYLE_ENLARGE = os.path.join(basedir(), "assets", "enlarge.css")

STYLE = os.path.join(basedir(), "style.css")
CACHE = os.path.join(basedir(), "cache.json")


def add_ui_settings():
    args = {"section": ("boomer", "Boomer"), "category_id": "ui"}

    opts.add_option(
        "bmr_rfr_style",
        OptionInfo(True, 'Duplicate "Refresh Style" button', **args),
    )
    opts.add_option(
        "bmr_sav_style",
        OptionInfo(True, 'Add "Save Style" button', **args),
    )
    opts.add_option(
        "bmr_send_btn",
        OptionInfo(True, "Change the button icons back to texts", **args),
    )

    opts.add_option(
        "bmr_fit",
        OptionInfo(True, 'Revert gallery images from "Fill" to "Fit"', **args),
    )
    opts.add_option(
        "bmr_thumbs",
        OptionInfo(True, 'Restore the old "thumbs" look of ExtraNetwork cards', **args),
    )
    opts.add_option(
        "bmr_enlarge",
        OptionInfo(False, "Enlarge the ExtraNetwork cards when hovered", **args),
    )
    opts.add_option(
        "bmr_arrow",
        OptionInfo(False, "Enlarge the arrow buttons in fullscreen image view", **args),
    )


def load_ui_settings():
    from json import dump, load

    version = 2.0
    options: list[bool, int] = [
        getattr(opts, "bmr_fit", True),
        getattr(opts, "bmr_thumbs", True),
        getattr(opts, "bmr_enlarge", False),
        getattr(opts, "bmr_arrow", False),
        version,
    ]

    try:
        with open(CACHE, "r") as file:
            cache: list[bool] = load(file)

        if cache == options:
            return

    except Exception:
        pass

    with open(CACHE, "w+") as file:
        dump(options, file)

    styles: list[str] = []

    if options[0]:
        with open(STYLE_FIT, "r") as file:
            styles.extend(file.readlines())

    if options[1]:
        with open(STYLE_THUMBS, "r") as file:
            styles.extend(file.readlines())

    if options[2]:
        with open(STYLE_ENLARGE, "r") as file:
            styles.extend(file.readlines())

    if options[3]:
        with open(STYLE_ARROW, "r") as file:
            styles.extend(file.readlines())

    with open(STYLE, "w+") as file:
        file.writelines(styles)


on_ui_settings(add_ui_settings)
on_before_ui(load_ui_settings)
