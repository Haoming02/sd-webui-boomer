# SD Webui Boomer
This is an Extension for the [Automatic1111 Webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui), which reverts some UI changes.

> Also supports [Forge](https://github.com/lllyasviel/stable-diffusion-webui-forge)!

## Settings
- You can enable/disable the following features in the `Boomer` section under the <ins>User Interface</ins> category in the **Settings** page
    - All settings require `Reload UI` to apply

### Boomer Features
1. Duplicate `Refresh Style` button back under **Generate**
2. Add a `Save Style` button back under **Generate**
3. Change the icons of the buttons under generation **Gallery** back to texts
4. Revert image thumbnails scaling from `fill` to `fit`
5. Restore the old "`thumbs`" look of **Extra Networks**

### Features for Boomer
6. Enlarge the Extra Networks cards slightly when hovered
7. Enlarge the Previous `<` and Next `>` buttons when viewing the result images in fullscreen

<hr>

### Removed Features
- Duplicate `Apply Style` button back under **Generate** *(reverted in `v1.7.0`)*
- Change the **Extra Networks** tabs from the new <ins>Tree</ins> view back to the old <ins>Folder</ins> view *(reverted in `v1.9.0`)*
