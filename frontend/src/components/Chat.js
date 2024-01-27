import React from 'react'

export const Chat = () => {
  return (
      <div>
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
              Launch demo modal
          </button>

          <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                          </button>
                      </div>
                      <div class="modal-body">
                          <h2 style="text-align: center; margin-top: 50px;">Chat With AI</h2>
                          <span class="downarrow" style="font-weight: 100;text-align: center;font-size: 50px;position: relative;left: 750px">&darr;</span>
                          <iframe src="https://www.chatbase.co/chatbot-iframe/N3r2KrzbYvsk9jE3U9dUQ" width="100%"
                              style="height: 100%; min-height: 700px" frameborder="0"></iframe>
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-primary">Save changes</button>
                      </div>
                  </div>
              </div>
          </div>
    </div>
  )
}
