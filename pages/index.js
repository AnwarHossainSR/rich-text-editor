import { EditorState } from 'draft-js';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

function uploadImageCallBack(file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.imgur.com/5463534680654/image');
    xhr.setRequestHeader('Authorization', 'Client-ID 311cad59774c70f');
    const data = new FormData();
    data.append('image', file);
    xhr.send(data);
    xhr.addEventListener('load', () => {
      const response = JSON.parse(xhr.responseText);
      console.log(response);
      resolve(response);
    });
    xhr.addEventListener('error', () => {
      const error = JSON.parse(xhr.responseText);
      console.log(error);
      reject(error);
    });
  });
}

const Home = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const onEditorStateChange = (editor) => {
    setEditorState(editor);
  };
  console.log(editorState.getCurrentContent().getPlainText());
  return (
    <>
      <div className='container my-5'>
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          wrapperClassName='wrapperClassName'
          editorClassName='editorClassName'
          toolbarClassName='toolbarClassName'
          placeholder='Enter your text here:'
          style={{
            height: 200,
            margin: 12,
            borderWidth: 0.5,
            padding: 10,
            borderRadius: '2px',
          }}
          toolbar={{
            image: {
              urlEnabled: true,
              uploadEnabled: true,
              uploadCallback: uploadImageCallBack,
              previewImage: true,
              alt: { present: false, mandatory: false },
            },
            // image: {
            //   uploadCallback: uploadImageCallBack,
            //   alt: { present: true, mandatory: true },
            // },
          }}
        />
      </div>
    </>
  );
};

export default Home;

// import { EditorState } from 'draft-js';
// import dynamic from 'next/dynamic';
// import { useState } from 'react';
// const Editor = dynamic(
//   () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
//   { ssr: false }
// );

// const Home = () => {
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());
//   const onEditorStateChange = (editorState) => {
//     setEditorState(editorState);
//   };

//   const uploadImageCallBack = async (file) => {
//     return {
//       data: {
//         link: 'dfgdfgdfg',
//       },
//     };
//   };
//   return (
//     <div>
//       <p> My Other Contents </p>
//       <Editor
//         editorState={editorState}
//         toolbarClassName='toolbar-class'
//         wrapperClassName='wrapper-class'
//         editorClassName='editor-class'
//         onEditorStateChange={onEditorStateChange}
//         toolbar={{
//           options: [
//             'inline',
//             'blockType',
//             'fontSize',
//             'fontFamily',
//             'list',
//             'textAlign',
//             'colorPicker',
//             'link',
//             'embedded',
//             'emoji',
//             'image',
//             'history',
//           ],
//           inline: { inDropdown: true },
//           list: { inDropdown: true },
//           textAlign: { inDropdown: true },
//           link: { inDropdown: true },
//           history: { inDropdown: true },
//           image: {
//             urlEnabled: true,
//             uploadEnabled: true,
//             uploadCallback: uploadImageCallBack,
//             previewImage: true,
//             alt: { present: false, mandatory: false },
//           },
//         }}
//       />
//     </div>
//   );
// };
// export default Home;
