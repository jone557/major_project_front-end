import React, { useState } from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import { Controlled as ControlledEditor } from 'react-codemirror2'
import '../Assets/Styles/editor.css'
import { AiOutlineCopy, AiOutlineArrowsAlt, AiOutlineArrowLeft} from 'react-icons/ai'
import swal from 'sweetalert2';

export default function Editor(props) {
    const {
        language,
        displayName,
        value,
        onChange
    } = props
    const [open, setOpen] = useState(true)

    function handleChange(editor, data, value) {
        onChange(value)
    }

    return (
        <div className={`editor-container ${open ? '' : 'collapsed'}`}>
            <div className="editor-title">
                {displayName}
                <AiOutlineCopy title='copy the code' className='comp-sub-elem-hdr ' onClick={() => {
                        navigator.clipboard.writeText(value)
                        swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'code is succesfully copied!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }} />
                <button
                    type="button"
                    className="expand-collapse-btn"
                    onClick={() => setOpen(prevOpen => !prevOpen)}
                >
                    {open ? <AiOutlineArrowLeft/> : <AiOutlineArrowsAlt/>}
                    {/* <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} /> */}
                </button>
            </div>
            <ControlledEditor
                onBeforeChange={handleChange}
                value={value}
                className="code-mirror-wrapper"
                options={{
                    lineWrapping: true,
                    lint: true,
                    mode: language,
                    theme: 'material',
                    lineNumbers: true
                }}
            />
        </div>
    )
}