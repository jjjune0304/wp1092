import Uploader from '../components/Uploader';

import "./Upload.css";

import { useMutation } from '@apollo/react-hooks';
import { UPDATE_MUTATION } from '../graphql';

export default function Upload() {

    // TODO get the mutation function
    // pass it to the Uploader component
    const [ updateMutation ] = useMutation(UPDATE_MUTATION);
    return <div id="Upload">
        <div id="PeopleUploader">
            <Uploader tag="People" mutation={updateMutation}/>
        </div>
    </div>;
}
