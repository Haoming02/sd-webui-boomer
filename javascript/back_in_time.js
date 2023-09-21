class TimeMachine {

    static duplicateApplyStyle() {
        const config = gradioApp().getElementById('setting_bmr_app_style').querySelector('input[type=checkbox]')
        return config.checked
    }

    static duplicateSaveStyle() {
        const config = gradioApp().getElementById('setting_bmr_sav_style').querySelector('input[type=checkbox]')
        return config.checked
    }

    static restoreButtons() {
        const config = gradioApp().getElementById('setting_bmr_send_btn').querySelector('input[type=checkbox]')
        return config.checked
    }

    static main() {
        ['txt', 'img'].forEach((mode) => {
            const tools = document.getElementById(mode + '2img_tools').querySelector('.form')

            // Copy Refresh & Apply Style to Main Page
            if (this.duplicateApplyStyle()) {
                const styles_row = document.getElementById(mode + '2img_styles_row').querySelector('.form')
                const styles_diag = document.getElementById(mode + '2img_styles_edit_button')

                const refresh_style_btn = document.getElementById('refresh_' + mode + '2img_styles')
                const new_btn1 = refresh_style_btn.cloneNode(true)
                new_btn1.id = 'boomer-refresh-' + mode
                styles_row.insertBefore(new_btn1, styles_diag)

                const apply_style_btn = document.getElementById(mode + '2img_style_apply')
                const new_btn2 = apply_style_btn.cloneNode(true)
                new_btn2.id = 'boomer-apply-' + mode
                tools.append(new_btn2)

                new_btn1.addEventListener('click', () => {
                    refresh_style_btn.dispatchEvent(new Event('click'))
                })

                new_btn2.addEventListener('click', () => {
                    apply_style_btn.dispatchEvent(new Event('click'))
                })
            }

            // Add Save Style
            if (this.duplicateSaveStyle()) {
                const new_btn3 = document.getElementById(mode + '2img_clear_prompt').cloneNode()
                new_btn3.innerHTML = '💾'
                new_btn3.title = "Save style"
                new_btn3.id = 'boomer-save-' + mode
                tools.append(new_btn3)

                const styles_dropdown = document.getElementById(mode + '2img_styles_edit_select')
                const input = styles_dropdown.querySelector('input')

                const pos_prompt = gradioApp().getElementById(mode + '2img_prompt').querySelector('textarea')
                const neg_prompt = gradioApp().getElementById(mode + '2img_neg_prompt').querySelector('textarea')

                const pos_field = gradioApp().getElementById(mode + '2img_edit_style_prompt').querySelector('textarea')
                const neg_field = gradioApp().getElementById(mode + '2img_edit_style_neg_prompt').querySelector('textarea')

                const save_style_btn = document.getElementById(mode + '2img_edit_style_save')

                new_btn3.addEventListener('click', () => {

                    var name = prompt('Name for the New Style: ', 'New Style')
                    input.value = name
                    pos_field.value = pos_prompt.value
                    neg_field.value = neg_prompt.value

                    updateInput(input)
                    updateInput(pos_field)
                    updateInput(neg_field)

                    input.dispatchEvent(new KeyboardEvent('keyup', { 'keyCode': 32, 'which': 32 }))

                    save_style_btn.dispatchEvent(new Event('click'))

                    input.value = ''
                    pos_field.value = ''
                    neg_field.value = ''

                })
            }

            // Replace Icon with Text
            if (this.restoreButtons()) {
                const row = document.getElementById('image_buttons_' + mode + '2img')
                const form = row.querySelector('.form')

                const new_row = row.cloneNode()
                const new_form = form.cloneNode()

                const dir_btn = document.getElementById(mode + '2img_open_folder')
                dir_btn.innerHTML = 'Open Output Folder'
                dir_btn.classList.remove('tool')

                const save_btn = document.getElementById('save_' + mode + '2img')
                save_btn.innerHTML = 'Save Image'
                save_btn.classList.remove('tool')

                const zip_btn = document.getElementById('save_zip_' + mode + '2img')
                zip_btn.innerHTML = 'Save as Zip'
                zip_btn.classList.remove('tool')

                const send_ii_btn = document.getElementById(mode + '2img_send_to_img2img')
                send_ii_btn.innerHTML = 'Send to img2img'
                send_ii_btn.classList.remove('tool')

                const send_in_btn = document.getElementById(mode + '2img_send_to_inpaint')
                send_in_btn.innerHTML = 'Send to Inpaint'
                send_in_btn.classList.remove('tool')

                const send_ex_btn = document.getElementById(mode + '2img_send_to_extras')
                send_ex_btn.innerHTML = 'Send to Extra'
                send_ex_btn.classList.remove('tool')

                new_form.appendChild(send_ii_btn)
                new_form.appendChild(send_in_btn)
                new_form.appendChild(send_ex_btn)

                new_row.appendChild(new_form)

                row.parentNode.insertBefore(new_row, row)
            }
        })

        // Extras
        if (this.restoreButtons()) {
            const dir_btn = document.getElementById('extras_open_folder')
            dir_btn.innerHTML = 'Open Output Folder'
            dir_btn.classList.remove('tool')

            const send_ii_btn = document.getElementById('extras_send_to_img2img')
            send_ii_btn.innerHTML = 'Send to img2img'
            send_ii_btn.classList.remove('tool')

            const send_in_btn = document.getElementById('extras_send_to_inpaint')
            send_in_btn.innerHTML = 'Send to Inpaint'
            send_in_btn.classList.remove('tool')

            const send_ex_btn = document.getElementById('extras_send_to_extras')
            send_ex_btn.innerHTML = 'Send to Extra'
            send_ex_btn.classList.remove('tool')
        }
    }
}

onUiLoaded(async () => {
    TimeMachine.main()
})
