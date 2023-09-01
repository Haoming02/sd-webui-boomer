﻿class TimeMachine {

    static Modes = ['txt', 'img']

    static main() {
        this.Modes.forEach((mode) => {

            const row = document.getElementById('image_buttons_' + mode + '2img')
            const form = row.querySelector('.form')

            const new_row = row.cloneNode()
            const new_form = form.cloneNode()

            // Move Apply Style to Main Page
            const apply_style_btn = document.getElementById(mode + '2img_style_apply')
            const tools = document.getElementById(mode + '2img_tools').querySelector('.form')
            tools.append(apply_style_btn)

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
