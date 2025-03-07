(function () {

    /** @param {string} task @param {string} error */
    function logError(task, error) { alert(`Error while "${task}"\n${error}`); }

    class TimeMachine {

        // ===== Settings =====
        static #duplicateRefreshStyle() {
            const config = document.getElementById('setting_bmr_rfr_style').querySelector('input[type=checkbox]');
            return config.checked;
        }

        static #duplicateSaveStyle() {
            const config = document.getElementById('setting_bmr_sav_style').querySelector('input[type=checkbox]');
            return config.checked;
        }

        static #restoreButtons() {
            const config = document.getElementById('setting_bmr_send_btn').querySelector('input[type=checkbox]');
            return config.checked;
        }

        // ===== Logics =====
        static main() {
            for (const mode of ['txt', 'img']) {

                // Copy Refresh Style to Main Page
                if (this.#duplicateRefreshStyle()) {
                    try {
                        const styles_diag = document.getElementById(`${mode}2img_styles_edit_button`);
                        const styles_row = styles_diag.parentNode;

                        const refresh_style_btn = document.getElementById(`refresh_${mode}2img_styles`);
                        const new_btn = refresh_style_btn.cloneNode(false);
                        new_btn.onclick = () => { refresh_style_btn.click(); }
                        new_btn.textContent = refresh_style_btn.textContent;
                        new_btn.id = `boomer-${new_btn.id}`;

                        styles_row.insertBefore(new_btn, styles_diag);
                    } catch (e) { logError("Duplicate Refresh Style Button", e); }
                }

                // Add Save Style
                if (this.#duplicateSaveStyle()) {
                    try {
                        const apply_btn = document.getElementById(`${mode}2img_style_apply`);
                        const tools = apply_btn.parentNode;

                        const new_btn = apply_btn.cloneNode(false);
                        new_btn.textContent = '💾';
                        new_btn.title = "Save current prompts as style";
                        new_btn.id = `boomer-${mode}2img_style_save`;
                        tools.appendChild(new_btn);

                        const name_field = document.getElementById(`${mode}2img_styles_edit_select`).querySelector('input');
                        const pos_field = document.getElementById(`${mode}2img_edit_style_prompt`).querySelector('textarea');
                        const neg_field = document.getElementById(`${mode}2img_edit_style_neg_prompt`).querySelector('textarea');

                        const pos_prompt = document.getElementById(`${mode}2img_prompt`).querySelector('textarea');
                        const neg_prompt = document.getElementById(`${mode}2img_neg_prompt`).querySelector('textarea');

                        const save_style_btn = document.getElementById(`${mode}2img_edit_style_save`);

                        new_btn.onclick = () => {
                            try {
                                const new_name = prompt('Name for the New Style: ', 'New Style');
                                if (new_name == null)
                                    return;

                                name_field.value = new_name.trim();
                                pos_field.value = pos_prompt.value;
                                neg_field.value = neg_prompt.value;

                                updateInput(name_field);
                                updateInput(pos_field);
                                updateInput(neg_field);

                                name_field.dispatchEvent(new KeyboardEvent('keyup', { 'keyCode': 32, 'which': 32 }));
                                save_style_btn.click();
                            } catch (e) { logError("Save a new Style", e); }
                        }
                    } catch (e) { logError("Duplicate Save Style Button", e); }
                }

                // Replace Icon with Text
                if (this.#restoreButtons()) {
                    try {
                        const row = document.getElementById(`image_buttons_${mode}2img`);
                        const is_gradio4 = (row.querySelector('.form') == null);
                        let new_form;

                        if (is_gradio4) {
                            new_form = row.cloneNode(false);
                            new_form.id = `boomer-${row.id}`;

                            row.parentNode.insertBefore(new_form, row);
                        } else {
                            const new_row = row.cloneNode(false);
                            new_row.id = `boomer-${row.id}`;

                            new_form = row.querySelector('.form').cloneNode(false);
                            new_row.appendChild(new_form);
                            row.parentNode.insertBefore(new_row, row);
                        }

                        const dir_btn = document.getElementById(`${mode}2img_open_folder`);
                        if (dir_btn != null) {
                            dir_btn.textContent = 'Open Output Folder';
                            dir_btn.classList.remove('tool');
                        }

                        const save_btn = document.getElementById(`save_${mode}2img`);
                        if (save_btn != null) {
                            save_btn.textContent = 'Save Image';
                            save_btn.classList.remove('tool');
                        }

                        const zip_btn = document.getElementById(`save_zip_${mode}2img`);
                        if (zip_btn != null) {
                            zip_btn.textContent = 'Save as Zip';
                            zip_btn.classList.remove('tool');
                        }

                        const send_ii_btn = document.getElementById(`${mode}2img_send_to_img2img`);
                        if (send_ii_btn != null) {
                            send_ii_btn.textContent = 'Send to img2img';
                            send_ii_btn.classList.remove('tool');
                            new_form.appendChild(send_ii_btn);
                        }

                        const send_in_btn = document.getElementById(`${mode}2img_send_to_inpaint`);
                        if (send_in_btn != null) {
                            send_in_btn.textContent = 'Send to Inpaint';
                            send_in_btn.classList.remove('tool');
                            new_form.appendChild(send_in_btn);
                        }

                        const send_ex_btn = document.getElementById(`${mode}2img_send_to_extras`);
                        if (send_ex_btn != null) {
                            send_ex_btn.textContent = 'Send to Extra';
                            send_ex_btn.classList.remove('tool');
                            new_form.appendChild(send_ex_btn);
                        }

                        const send_svd_btn = document.getElementById(`${mode}2img_send_to_svd`);
                        if (send_svd_btn != null) {
                            send_svd_btn.textContent = 'Send to SVD';
                            send_svd_btn.classList.remove('tool');
                            new_form.appendChild(send_svd_btn);
                        }

                        const upscale_btn = document.getElementById(`${mode}2img_upscale`);
                        if (upscale_btn != null) {
                            upscale_btn.textContent = 'Upscale';
                            upscale_btn.classList.remove('tool');
                        }
                    } catch (e) { logError("Restore Buttons", e); }
                }
            }

            // Extras Tab
            if (this.#restoreButtons()) {
                try {
                    const dir_btn = document.getElementById('extras_open_folder');
                    if (dir_btn != null) {
                        dir_btn.textContent = 'Open Output Folder';
                        dir_btn.classList.remove('tool');
                    }

                    const send_ii_btn = document.getElementById('extras_send_to_img2img');
                    if (send_ii_btn != null) {
                        send_ii_btn.textContent = 'Send to img2img';
                        send_ii_btn.classList.remove('tool');
                    }

                    const send_in_btn = document.getElementById('extras_send_to_inpaint');
                    if (send_in_btn != null) {
                        send_in_btn.textContent = 'Send to Inpaint';
                        send_in_btn.classList.remove('tool');
                    }

                    const send_ex_btn = document.getElementById('extras_send_to_extras');
                    if (send_ex_btn != null) {
                        send_ex_btn.textContent = 'Send to Extra';
                        send_ex_btn.classList.remove('tool');
                    }

                    const send_svd_btn = document.getElementById('extras_send_to_svd');
                    if (send_svd_btn != null) {
                        send_svd_btn.textContent = 'Send to SVD';
                        send_svd_btn.classList.remove('tool');
                    }
                } catch (e) { logError("Restore Buttons (Extras)", e); }
            }
        }

    }

    onUiLoaded(() => { TimeMachine.main(); });
})();
