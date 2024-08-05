from modules import script_callbacks, shared
import modules.scripts as scripts
import os

STYLE_FIT = os.path.join(scripts.basedir(), "assets", "fit.css")
STYLE_THUMBS = os.path.join(scripts.basedir(), "assets", "thumbs.css")
STYLE_ENLARGE = os.path.join(scripts.basedir(), "assets", "enlarge.css")
STYLE_FOLDER = os.path.join(scripts.basedir(), "assets", "folders.css")

STYLE = os.path.join(scripts.basedir(), "style.css")
section = ("boomer", "Boomer")


def add_ui_settings():
    shared.opts.add_option("bmr_app_style", shared.OptionInfo(False, 'Duplicate "Apply Style" button back under Generate', section=section))
    shared.opts.add_option("bmr_rfr_style", shared.OptionInfo(True, 'Duplicate "Refresh Style" button back under Generate', section=section))
    shared.opts.add_option("bmr_sav_style", shared.OptionInfo(True, 'Add a "Save Style" button back under Generate', section=section))
    shared.opts.add_option("bmr_send_btn", shared.OptionInfo(True, 'Change the icons of the buttons under Generation Result back to texts', section=section))

    shared.opts.add_option("bmr_fit", shared.OptionInfo(True, "Revert image thumbnails scaling from Fill to Fit", section=section))
    shared.opts.add_option("bmr_thumbs", shared.OptionInfo(True, 'Restore the old "thumbs" look of Extra Networks', section=section))
    shared.opts.add_option("bmr_enlarge", shared.OptionInfo(False, "Enlarege the Extra Networks card when hovered", section=section))

    shared.opts.add_option("bmr_res_extras", shared.OptionInfo(False, "Revert the Extra Networks from the Tree View to the Folder Buttons", section=section))
    shared.opts.add_option("bmr_res_extras_rmb", shared.OptionInfo(False, "|-- Remove the base folder name (eg. Lora) from the folder buttons above", section=section))



def load_ui_settings():
    styles = []

    if getattr(shared.opts, "bmr_fit", True):
        with open(STYLE_FIT, "r") as FILE:
            styles += FILE.readlines()

    if getattr(shared.opts, "bmr_thumbs", True):
        with open(STYLE_THUMBS, "r") as FILE:
            styles += FILE.readlines()

    if getattr(shared.opts, "bmr_enlarge", False):
        with open(STYLE_ENLARGE, "r") as FILE:
            styles += FILE.readlines()

    if getattr(shared.opts, "bmr_res_extras", False):
        with open(STYLE_FOLDER, "r") as FILE:
            styles += FILE.readlines()

    with open(STYLE, "w+") as FILE:
        FILE.writelines(styles)


script_callbacks.on_ui_settings(add_ui_settings)
script_callbacks.on_before_ui(load_ui_settings)
