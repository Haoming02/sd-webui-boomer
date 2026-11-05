(function () {
    const MODES = ["txt", "img"];

    const galleryLabels = (mode) => [
        [`${mode}2img_open_folder`, "Open Output Folder"],
        [`save_${mode}2img`, "Save Image"],
        [`save_zip_${mode}2img`, "Save as Zip"],
        [`${mode}2img_send_to_img2img`, "Send to img2img", true],
        [`${mode}2img_send_to_inpaint`, "Send to Inpaint", true],
        [`${mode}2img_send_to_extras`, "Send to Extra", true],
        [`${mode}2img_send_to_svd`, "Send to SVD", true],
        [`${mode}2img_upscale`, "Upscale"],
    ];

    const extrasLabels = [
        ["extras_open_folder", "Open Output Folder"],
        ["extras_send_to_img2img", "Send to img2img"],
        ["extras_send_to_inpaint", "Send to Inpaint"],
        ["extras_send_to_extras", "Send to Extra"],
        ["extras_send_to_svd", "Send to SVD"],
    ];

    const byId = (id) => document.getElementById(id);
    const field = (id, tag) => byId(id).querySelector(tag);

    function attempt(task, work) {
        try {
            work();
        } catch (error) {
            console.error(`Boomer: ${task}`, error);
        }
    }

    function labelAsText(id, text, moveTo) {
        const button = byId(id);
        if (button === null) return;

        button.textContent = text;
        button.classList.remove("tool");
        moveTo?.appendChild(button);
    }

    function buildButtonForm(mode) {
        const row = byId(`image_buttons_${mode}2img`);
        const wrapper = row.cloneNode(false);
        wrapper.id = `boomer-${row.id}`;

        const form = row.querySelector(".form");

        if (form === null) {
            row.parentNode.insertBefore(wrapper, row);
            return wrapper;
        }

        const copy = form.cloneNode(false);
        wrapper.appendChild(copy);
        row.parentNode.insertBefore(wrapper, row);

        return copy;
    }

    function duplicateRefreshStyle(mode) {
        const original = byId(`refresh_${mode}2img_styles`);
        const dialog = byId(`${mode}2img_styles_edit_button`);

        const copy = original.cloneNode(false);
        copy.id = `boomer-${copy.id}`;
        copy.textContent = original.textContent;
        copy.onclick = () => original.click();

        dialog.parentNode.insertBefore(copy, dialog);
    }

    function saveStyleAs(mode) {
        const name = prompt("Name for the New Style: ", "New Style");
        if (name === null) return;

        const nameField = field(`${mode}2img_styles_edit_select`, "input");
        const posField = field(`${mode}2img_edit_style_prompt`, "textarea");
        const negField = field(`${mode}2img_edit_style_neg_prompt`, "textarea");

        nameField.value = name.trim();
        posField.value = field(`${mode}2img_prompt`, "textarea").value;
        negField.value = field(`${mode}2img_neg_prompt`, "textarea").value;

        for (const input of [nameField, posField, negField]) updateInput(input);
        byId(`${mode}2img_edit_style_save`).click();
    }

    function addSaveStyleButton(mode) {
        const apply = byId(`${mode}2img_style_apply`);

        const save = apply.cloneNode(false);
        save.id = `boomer-${mode}2img_style_save`;
        save.textContent = "💾";
        save.title = "Save current prompts as style";
        apply.parentNode.appendChild(save);

        save.onclick = () => attempt("Save a new Style", () => saveStyleAs(mode));
    }

    function restoreTextButtons(mode) {
        const form = buildButtonForm(mode);
        for (const [id, text, move] of galleryLabels(mode)) labelAsText(id, text, move ? form : null);
    }

    function restoreExtrasButtons() {
        for (const [id, text] of extrasLabels) labelAsText(id, text);
    }

    let applied = false;

    function applyBoomer() {
        if (applied) return;
        applied = true;

        for (const mode of MODES) {
            if (opts.bmr_rfr_style) attempt("Duplicate Refresh Style Button", () => duplicateRefreshStyle(mode));
            if (opts.bmr_sav_style) attempt("Add Save Style Button", () => addSaveStyleButton(mode));
            if (opts.bmr_send_btn) attempt("Restore Buttons", () => restoreTextButtons(mode));
        }

        if (opts.bmr_send_btn) attempt("Restore Buttons (Extras)", restoreExtrasButtons);
    }

    onUiLoaded(() => onOptionsAvailable(applyBoomer));
})();
