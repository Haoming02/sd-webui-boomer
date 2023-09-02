class TimeMachine {

    static Modes = ['txt', 'img']

    static main() {
        this.Modes.forEach((mode) => {

            const row = document.getElementById('image_buttons_' + mode + '2img')
            const form = row.querySelector('.form')

            const new_row = row.cloneNode()
            const new_form = form.cloneNode()

            // Copy Apply Style to Main Page
            const tools = document.getElementById(mode + '2img_tools').querySelector('.form')
            const styles_row = document.getElementById(mode + '2img_styles_row').querySelector('.form')
            const styles_diag = document.getElementById(mode + '2img_styles_edit_button')

            const refresh_style_btn = document.getElementById('refresh_' + mode + '2img_styles')
            const new_btn1 = refresh_style_btn.cloneNode(true)
            styles_row.insertBefore(new_btn1, styles_diag)

            const apply_style_btn = document.getElementById(mode + '2img_style_apply')
            const new_btn2 = apply_style_btn.cloneNode(true)
            tools.append(new_btn2)

            new_btn1.addEventListener('click', () => {
                refresh_style_btn.dispatchEvent(new Event('click'))
            })

            new_btn2.addEventListener('click', () => {
                apply_style_btn.dispatchEvent(new Event('click'))
            })

            // Replace Icon with Text
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
        })

        // Extras
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

onUiLoaded(async () => {
    TimeMachine.main()
})
