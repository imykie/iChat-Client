import React from 'react'

export default function AddMember(){


    return (
        <div>
            <input
              type="text"
              name="conversation_name"
              value={conversation_name}
              onChange={onCreateConversationChange}
              style={{ width: 80 + "%", marginLeft: 10 + "%" }}
            />
        </div>
    )
}