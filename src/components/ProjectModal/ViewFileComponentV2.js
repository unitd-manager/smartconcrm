import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import PropTypes from 'prop-types'
import message from '../Message';
import api from '../../constants/api';

function ViewFileComponentV2({ moduleId, roomName }) {

    ViewFileComponentV2.propTypes = {
        moduleId: PropTypes.string,
        roomName:PropTypes.string
    }

    const tableStyle = {
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'black'
      };

    const [getFile, setGetFile] = useState(null);


    const getFiles = () => {
        api.post('/file/getListOfFiles', { record_id: moduleId, room_name: roomName })
            .then((res) => {
                setGetFile(res.data);
                console.log(res.data);
            })
    }


    const deleteFile = (fileId) => {
        Swal.fire({
            title: `Are you sure?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                api.post('/file/deleteFile', { media_id: fileId }).then((res) => {
                    console.log(res)
                    Swal.fire(
                        'Deleted!',
                        'Media has been deleted.',
                        'success'
                    )
                    //setViewLineModal(false)

                    window.location.reload();
                }).catch(() => {
                    message("Unable to Delete Media", "info")
                })
            }
        })
    }


    useEffect(() => {
        getFiles();
    }, [])


    return (
        <>
            <table style={tableStyle}>
                <tr style={tableStyle}>
                    <th style={tableStyle}><p>File Name</p></th>
                    <th width="5%"></th>
                </tr>
                {getFile ? getFile.map(res => {
                    return (
                        <>
                            <tr>
                                <td style={tableStyle}> <p><a href={`http://43.228.126.245/smartco-api/storage/uploads/${res.name}`} target="_blank" rel="noreferrer">{res.name}</a> </p></td>
                                <td style={tableStyle}> <button type="button" className="btn btn-secondary" onClick={() => { deleteFile(res.media_id) }}> X </button></td>
                            </tr>
                        </>
                    )
                }) : (<p>no files uploaded yet</p>)}
            </table>
        </>
    )
}

export default ViewFileComponentV2