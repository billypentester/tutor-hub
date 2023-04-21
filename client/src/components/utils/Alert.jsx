import React from 'react'

function Alert({ type, message }) {

    // setTimeout(function() {
    //     const alert = document.querySelector('.alert')
    //     if(alert) {
    //         alert.style.display = 'none'
    //     }
    // }, 5000);

    return (
        <div class={`alert alert-dismissible alert-${type} position-fixed bottom-0 end-0 m-4`} style={{zIndex: 9999}} role="alert">
            <button type="button" class="btn-close" data-dismiss="alert"></button>
            {message}
        </div>
    )
}

export default Alert