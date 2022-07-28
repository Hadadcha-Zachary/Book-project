import { Component, OnInit, ViewChild, } from '@angular/core';
import Quill from 'quill';
import { EditorChangeContent, EditorChangeSelection, QuillEditorComponent } from 'ngx-quill';
import { NEW_PAGE_MESSAGE_TYPE } from '../book/book.component';

@Component({
  selector: 'app-new-page-creator',
  templateUrl: './new-page-creator.component.html',
  styleUrls: ['./new-page-creator.component.scss']
})
export class NewPageCreatorComponent {
  @ViewChild('editor') editor?: QuillEditorComponent;

  savePage() {
    if (this.editor?.quillEditor.root.innerHTML) {
      window.opener.parent.postMessage({content: this.editor?.quillEditor.root.innerHTML, type: NEW_PAGE_MESSAGE_TYPE}, '*');
    }
    window.close();
  }

}
