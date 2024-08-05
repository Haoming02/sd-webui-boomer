from modules.script_callbacks import on_ui_settings, on_before_ui
from modules.shared import opts, OptionInfo
import modules.scripts as scripts
import os

STYLE_FIT = os.path.join(scripts.basedir(), "assets", "fit.css")
STYLE_THUMBS = os.path.join(scripts.basedir(), "assets", "thumbs.css")
STYLE_ENLARGE = os.path.join(scripts.basedir(), "assets", "enlarge.css")

STYLE = os.path.join(scripts.basedir(), "style.css")
section = ("boomer", "Boomer")


def add_ui_settings():
    opts.add_option(
        "bmr_rfr_style",
        OptionInfo(True, 'Duplicate "Refresh Style" button', section=section),
    )
    opts.add_option(
        "bmr_sav_style",
        OptionInfo(True, 'Add "Save Style" button', section=section),
    )
    opts.add_option(
        "bmr_send_btn",
        OptionInfo(True, "Change the button icons back to texts", section=section),
    )

    opts.add_option(
        "bmr_fit",
        OptionInfo(
            True, "Revert image thumbnails scaling from Fill to Fit", section=section
        ),
    )
    opts.add_option(
        "bmr_thumbs",
        OptionInfo(
            True, 'Restore the old "thumbs" look of Extra Networks', section=section
        ),
    )
    opts.add_option(
        "bmr_enlarge",
        OptionInfo(
            False, "Enlarege the Extra Networks card when hovered", section=section
        ),
    )


def load_ui_settings():
    styles = []

    if getattr(opts, "bmr_fit", True):
        with open(STYLE_FIT, "r") as FILE:
            styles += FILE.readlines()

    if getattr(opts, "bmr_thumbs", True):
        with open(STYLE_THUMBS, "r") as FILE:
            styles += FILE.readlines()

    if getattr(opts, "bmr_enlarge", False):
        with open(STYLE_ENLARGE, "r") as FILE:
            styles += FILE.readlines()

    if styles:
        with open(STYLE, "w+") as FILE:
            FILE.writelines(styles)


on_ui_settings(add_ui_settings)
on_before_ui(load_ui_settings)
