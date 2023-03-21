import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
const QuillNoSSRWrapper = dynamic(import('react-quill'), {	
	ssr: false,
	loading: () => <p>Loading ...</p>,
	})

    export default function MailEditor() {
        return <QuillNoSSRWrapper  theme="snow" />
      }