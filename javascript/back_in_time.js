class TimeMachine {

    // ===== Settings =====
    static duplicateApplyStyle() {
        const config = gradioApp().getElementById('setting_bmr_app_style').querySelector('input[type=checkbox]');
        return config.checked;
    }

    static duplicateRefreshStyle() {
        const config = gradioApp().getElementById('setting_bmr_rfr_style').querySelector('input[type=checkbox]');
        return config.checked;
    }

    static duplicateSaveStyle() {
        const config = gradioApp().getElementById('setting_bmr_sav_style').querySelector('input[type=checkbox]');
        return config.checked;
    }

    static restoreButtons() {
        const config = gradioApp().getElementById('setting_bmr_send_btn').querySelector('input[type=checkbox]');
        return config.checked;
    }

    static restoreExtras() {
        const config = gradioApp().getElementById('setting_bmr_res_extras').querySelector('input[type=checkbox]');
        return config.checked;
    }

    static restoreExtras_RemoveBaseFolder() {
        const config = gradioApp().getElementById('setting_bmr_res_extras_rmb').querySelector('input[type=checkbox]');
        return config.checked;
    }

    // ===== Logics =====
    static main() {
        ['txt', 'img'].forEach((mode) => {
            const tools = document.getElementById(`${mode}2img_tools`).querySelector('.form');

            // Copy Apply Style to Main Page
            if (this.duplicateApplyStyle()) {
                try {
                    const apply_style_btn = document.getElementById(`${mode}2img_style_apply`);
                    const new_btn = apply_style_btn.cloneNode(true);
                    new_btn.id = `boomer-apply-${mode}`;
                    tools.append(new_btn);

                    new_btn.addEventListener('click', () => {
                        apply_style_btn.dispatchEvent(new Event('click'));
                    });
                } catch (e) {
                    alert(`Something went wrong while trying to: "Duplicate Apply Style"\n${e}`);
                }
            }

            // Copy Refresh Style to Main Page
            if (this.duplicateRefreshStyle()) {
                try {
                    const styles_row = document.getElementById(`${mode}2img_styles_row`).querySelector('.form');
                    const styles_diag = document.getElementById(`${mode}2img_styles_edit_button`);

                    const refresh_style_btn = document.getElementById(`refresh_${mode}2img_styles`);
                    const new_btn = refresh_style_btn.cloneNode(true);
                    new_btn.id = `boomer-refresh-${mode}`;
                    styles_row.insertBefore(new_btn, styles_diag);

                    new_btn.addEventListener('click', () => {
                        refresh_style_btn.dispatchEvent(new Event('click'));
                    });
                } catch (e) {
                    alert(`Something went wrong while trying to: "Duplicate Refresh Style"\n${e}`);
                }
            }

            // Add Save Style
            if (this.duplicateSaveStyle()) {
                try {
                    const new_btn = document.getElementById(`${mode}2img_clear_prompt`).cloneNode();
                    new_btn.textContent = '💾';
                    new_btn.title = "Save style";
                    new_btn.id = `boomer-save-${mode}`;
                    tools.append(new_btn);

                    const styles_dropdown = document.getElementById(`${mode}2img_styles_edit_select`);
                    const input = styles_dropdown.querySelector('input');

                    const pos_prompt = gradioApp().getElementById(`${mode}2img_prompt`).querySelector('textarea');
                    const neg_prompt = gradioApp().getElementById(`${mode}2img_neg_prompt`).querySelector('textarea');

                    const pos_field = gradioApp().getElementById(`${mode}2img_edit_style_prompt`).querySelector('textarea');
                    const neg_field = gradioApp().getElementById(`${mode}2img_edit_style_neg_prompt`).querySelector('textarea');

                    const save_style_btn = document.getElementById(`${mode}2img_edit_style_save`);

                    new_btn.addEventListener('click', () => {
                        try {
                            var name = prompt('Name for the New Style: ', 'New Style');
                            input.value = name;
                            pos_field.value = pos_prompt.value;
                            neg_field.value = neg_prompt.value;

                            updateInput(input);
                            updateInput(pos_field);
                            updateInput(neg_field);

                            input.dispatchEvent(new KeyboardEvent('keyup', { 'keyCode': 32, 'which': 32 }));

                            save_style_btn.dispatchEvent(new Event('click'));

                            input.value = '';
                            pos_field.value = '';
                            neg_field.value = '';
                        } catch (e) {
                            alert(`Something went wrong while trying to save new style...\n${e}`);
                        }
                    });
                } catch (e) {
                    alert(`Something went wrong while trying to: "Duplicate Save Style"\n${e}`);
                }
            }

            // Replace Icon with Text
            if (this.restoreButtons()) {
                try {
                    const row = document.getElementById(`image_buttons_${mode}2img`);
                    const form = row.querySelector('.form');

                    const new_row = row.cloneNode();
                    const new_form = form.cloneNode();
                    new_row.id = `image_buttons_${mode}2img_clone`;

                    const dir_btn = document.getElementById(`${mode}2img_open_folder`);
                    dir_btn.textContent = 'Open Output Folder';
                    dir_btn.classList.remove('tool');

                    const save_btn = document.getElementById(`save_${mode}2img`);
                    save_btn.textContent = 'Save Image';
                    save_btn.classList.remove('tool');

                    const zip_btn = document.getElementById(`save_zip_${mode}2img`);
                    zip_btn.textContent = 'Save as Zip';
                    zip_btn.classList.remove('tool');

                    const send_ii_btn = document.getElementById(`${mode}2img_send_to_img2img`);
                    send_ii_btn.textContent = 'Send to img2img';
                    send_ii_btn.classList.remove('tool');

                    const send_in_btn = document.getElementById(`${mode}2img_send_to_inpaint`);
                    send_in_btn.textContent = 'Send to Inpaint';
                    send_in_btn.classList.remove('tool');

                    const send_ex_btn = document.getElementById(`${mode}2img_send_to_extras`);
                    send_ex_btn.textContent = 'Send to Extra';
                    send_ex_btn.classList.remove('tool');

                    new_form.appendChild(send_ii_btn);
                    new_form.appendChild(send_in_btn);
                    new_form.appendChild(send_ex_btn);

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

                    new_row.appendChild(new_form);
                    row.parentNode.insertBefore(new_row, row);
                } catch (e) {
                    alert(`Something went wrong while trying to: "Restore Buttons"\n${e}`);
                }
            }
        });

        // Extras
        if (this.restoreButtons()) {
            try {
                const dir_btn = document.getElementById('extras_open_folder');
                dir_btn.textContent = 'Open Output Folder';
                dir_btn.classList.remove('tool');

                const send_ii_btn = document.getElementById('extras_send_to_img2img');
                send_ii_btn.textContent = 'Send to img2img';
                send_ii_btn.classList.remove('tool');

                const send_in_btn = document.getElementById('extras_send_to_inpaint');
                send_in_btn.textContent = 'Send to Inpaint';
                send_in_btn.classList.remove('tool');

                const send_ex_btn = document.getElementById('extras_send_to_extras');
                send_ex_btn.textContent = 'Send to Extra';
                send_ex_btn.classList.remove('tool');

                const send_svd_btn = document.getElementById('extras_send_to_svd');
                if (send_svd_btn != null) {
                    send_svd_btn.textContent = 'Send to SVD';
                    send_svd_btn.classList.remove('tool');
                }
            } catch (e) {
                alert(`Something went wrong while trying to: "Restore Buttons"\n${e}`);
            }
        }
    }

    // Tree View
    static tree2folders() {
        try {
            ['txt', 'img'].forEach((mode) => {
                ['textual_inversion', 'hypernetworks', 'checkpoints', 'lora'].forEach((network) => {

                    const tree = document.getElementById(`${mode}2img_${network}_tree`);
                    if (tree == null)
                        return;

                    const tree_btn = document.getElementById(`${mode}2img_${network}_extra_tree_view`);
                    tree_btn.style.display = 'none';

                    const filter = document.getElementById(`${mode}2img_${network}_extra_search`);
                    const cards = document.getElementById(`${mode}2img_${network}_cards`);

                    while (cards.querySelector('.boomer-row'))
                        cards.firstChild.remove();

                    const row = document.createElement('div');
                    row.classList.add("boomer-row");

                    cards.insertBefore(row, cards.firstChild);

                    const allFolders = tree.querySelectorAll('.tree-list-item--has-subitem');

                    var dir = null;
                    if (this.restoreExtras_RemoveBaseFolder())
                        dir = tree.querySelector('.tree-list-content-dir')?.getAttribute('data-path');

                    allFolders.forEach((folder) => {
                        const click = folder.querySelector('div').getAttribute('data-path').replace(dir, '');

                        if (click.trim().length == 0)
                            return;

                        const btn = document.createElement('button');
                        btn.classList.add("boomer-btn");

                        btn.textContent = click;
                        btn.onclick = () => {

                            if (filter.value === click)
                                filter.value = "";
                            else
                                filter.value = click;

                            updateInput(filter);

                        };

                        row.appendChild(btn);
                    });

                    if (row.childElementCount === 0)
                        row.remove();

                });
            });
        }
        catch (e) {
            alert(`Something went wrong while trying to: "Restore Extras"\n${e}`);
        }
    }

}

onUiLoaded(async () => {
    TimeMachine.main();

    if (TimeMachine.restoreExtras()) {
        setTimeout(() => {
            TimeMachine.tree2folders();
        }, 1500);
    }

    ['txt', 'img'].forEach((mode) => {
        ['textual_inversion', 'hypernetworks', 'checkpoints', 'lora'].forEach((network) => {
            const btn = document.getElementById(`${mode}2img_${network}_extra_refresh`);
            btn.addEventListener("click", () => {
                setTimeout(() => {
                    TimeMachine.tree2folders();
                }, 500);
            });
        });
    });

});
