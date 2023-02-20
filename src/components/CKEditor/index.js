import React, { useEffect, useRef, useState } from 'react'

const CKEditor = ({data, onChange}) => {
  const editorRef = useRef()
  const [ editorLoaded, setEditorLoaded ] = useState( false )
  const { CKEditor, ClassicEditor} = editorRef.current || {}

  useEffect( () => {
      editorRef.current = {
        CKEditor: require( '@ckeditor/ckeditor5-react' ).CKEditor,
        ClassicEditor: require( '@ckeditor/ckeditor5-build-classic' ),
      }
      setEditorLoaded( true )
  }, [] );

  return( 
    <>
      {editorLoaded && <CKEditor
          editor={ ClassicEditor }
          data={data}
          onChange={ (event, editor ) => {
            const data = editor.getData()
            onChange(data);
          } }
      />}
   </>
   )
}

export default CKEditor