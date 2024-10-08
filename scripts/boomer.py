from modules.script_callbacks import on_ui_settings, on_before_ui
from modules.shared import opts, OptionInfo
from modules.scripts import basedir
from json import dump, load
import os

STYLE_FIT = os.path.join(basedir(), "assets", "fit.css")
STYLE_ARROW = os.path.join(basedir(), "assets", "arrow.css")
STYLE_THUMBS = os.path.join(basedir(), "assets", "thumbs.css")
STYLE_ENLARGE = os.path.join(basedir(), "assets", "enlarge.css")

STYLE = os.path.join(basedir(), "style.css")
section = ("boomer", "Boomer")

CACHE = os.path.join(basedir(), "cache.json")


def add_ui_settings():
    opts.add_option(
        "bmr_rfr_style",
        OptionInfo(
            True, 'Duplicate "Refresh Style" button', section=section, category_id="ui"
        ),
    )
    opts.add_option(
        "bmr_sav_style",
        OptionInfo(True, 'Add "Save Style" button', section=section, category_id="ui"),
    )
    opts.add_option(
        "bmr_send_btn",
        OptionInfo(
            True,
            "Change the button icons back to texts",
            section=section,
            category_id="ui",
        ),
    )

    opts.add_option(
        "bmr_fit",
        OptionInfo(
            True,
            "Revert image thumbnails scaling from Fill to Fit",
            section=section,
            category_id="ui",
        ),
    )
    opts.add_option(
        "bmr_thumbs",
        OptionInfo(
            True,
            'Restore the old "thumbs" look of Extra Networks',
            section=section,
            category_id="ui",
        ),
    )
    opts.add_option(
        "bmr_enlarge",
        OptionInfo(
            False,
            "Enlarege the Extra Networks card when hovered",
            section=section,
            category_id="ui",
        ),
    )
    opts.add_option(
        "bmr_arrow",
        OptionInfo(
            False,
            "Enlarege the Previous and Next arrow buttons in the fullscreen image viewer",
            section=section,
            category_id="ui",
        ),
    )


def load_ui_settings():

    options: list[bool] = [
        getattr(opts, "bmr_fit", True),
        getattr(opts, "bmr_thumbs", True),
        getattr(opts, "bmr_enlarge", False),
        getattr(opts, "bmr_arrow", False),
    ]

    unchanged = False

    try:
        if os.path.isfile(CACHE):
            with open(CACHE, "r") as file:
                cache: list[bool] = load(file)

            if cache == options:
                unchanged = True

    except:
        unchanged = False

    if unchanged:
        return

    styles = []

    if options[0]:
        with open(STYLE_FIT, "r") as FILE:
            styles += FILE.readlines()

    if options[1]:
        with open(STYLE_THUMBS, "r") as FILE:
            styles += FILE.readlines()

    if options[2]:
        with open(STYLE_ENLARGE, "r") as FILE:
            styles += FILE.readlines()

    if options[3]:
        with open(STYLE_ARROW, "r") as FILE:
            styles += FILE.readlines()

    if styles:
        with open(STYLE, "w+") as FILE:
            FILE.writelines(styles)

    with open(CACHE, "w+") as file:
        dump(options, file)


on_ui_settings(add_ui_settings)
on_before_ui(load_ui_settings)
