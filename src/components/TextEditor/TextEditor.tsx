import 'react-quill/dist/quill.snow.css';
import styles from './TextEditor.module.css';
import ReactQuill from 'react-quill';
import './custom-styles.css';

type TextEditor = {
  blogPost: string
  setBlogPost: (value: string) => void
}
export function TextEditor({blogPost, setBlogPost} :TextEditor) {
  

  const quillStyle = {
    color: 'var(--editor-text-color)', // Change this to the desired text color
    backgroundColor: 'var(--editor-bg-color)',// Change this to the desired background color
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

return(
  <div className={styles['editor-wrapper']}>
      <ReactQuill style={quillStyle} theme="snow" modules={modules} formats={formats} value={blogPost} onChange={onChangeHandler}/>
  </div> 
  )


  function onChangeHandler(value: string, delta: any, source: any, editor: any ){
    console.log(value, delta, source, editor);
    setBlogPost(value);
  }
}