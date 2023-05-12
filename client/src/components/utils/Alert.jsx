import React from 'react'

function Alert({ type, message }) {

    return (
        <div class={`alert alert-dismissible alert-${type} position-fixed bottom-0 end-0 m-4 w-25`} style={{zIndex: 9999}} role="alert">
            <button type="button" class="btn-close" data-dismiss="alert"></button>
            <strong>{message}</strong>
        </div>
    )
}

export default Alert