<td>

    ${
        auth.currentUser.uid === document.id

        ? `<span style="color:gray;font-weight:bold;">
            Current User
           </span>`

        : `<button
            class="saveRole"
            data-id="${document.id}">
            Save
           </button>`
    }

</td>