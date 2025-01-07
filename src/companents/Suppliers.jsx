    import React, { useState } from 'react'
    import 'bootstrap/dist/css/bootstrap.min.css';
    import { Button, Table } from 'react-bootstrap';
    import { useAddSuppliersMutation, useDeleteSuppliersMutation, useEditSupplierMutation, useGetSuppliersQuery } from '../redux/slices/supplier';
    import Swal from 'sweetalert2';

    function Suppliers() {
        let { isLoading, data, refetch } = useGetSuppliersQuery()
        let [addSupppliers] = useAddSuppliersMutation()
        let [deleteSuppliers] = useDeleteSuppliersMutation()
        let [editSupplier] = useEditSupplierMutation()
        let [company, setCompany] = useState("")
        let [contact, setContact] = useState("")
        let [editCompany, setEditCompany] = useState("")
        let [editContact, setEditContact] = useState("")
        let [display, setDisplay] = useState("none")
        let [editId,setEditId] = useState("")


        async function handleSubmit(e) {
            e.preventDefault()
            if (company.trim() && contact.trim()) {
                let newSuppliers = {
                    companyName: company,
                    contactName: contact
                }
                await addSupppliers(newSuppliers)
                refetch()
                Swal.fire({
                    icon: "success",
                    title: `${company} has been saved`,
                    showConfirmButton: false,
                    timer: 1500
                });
                setCompany("")
                setContact("")

            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!"
                });
            }

        }
        async function handleDelete(id) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await deleteSuppliers(id)
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            });
        }
        function handleDisplay(id,companyName,contactName) {
            setEditCompany(companyName)
            setEditContact(contactName)
            setEditId(id)
            setDisplay("block")


        }
        async function handleUpdate(e) {
            e.preventDefault()
            let updateSupplier = {
                id:editId,
                company: editCompany,
                contact: editContact
            }
            console.log(updateSupplier.id);    

            await editSupplier(updateSupplier)
            Swal.fire({
                icon: "success",
                title: `${editCompany} has been updated`,
                showConfirmButton: false,
                timer: 1500
            }); 
            refetch()
            setDisplay("none")
        }


        return (
            <div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <h1>Add Formu</h1>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="new company name"
                            onChange={(e) => setCompany(e.target.value)}
                            value={company}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="new contact name"
                            onChange={(e) => setContact(e.target.value)}
                            value={contact}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
                <form style={{ display: display, position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", backgroundColor: "antiquewhite", padding: "20px", width: "80%" }} onSubmit={(e) => handleUpdate(e)}>
                    <h1>Edit Formu</h1>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="edit company name"
                            onChange={(e) => setEditCompany(e.target.value)}
                            value={editCompany}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="edit contact name"
                            onChange={(e) => setEditContact(e.target.value)}
                            value={editContact}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

                {

                    isLoading ? (
                        <h1>...Loading</h1>
                    ) : (
                        <>

                            <h1 className='mt-4'>Tables</h1>
                            <Table striped bordered hover className='mt-4'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Company Name</th>
                                        <th>Contact Name</th>
                                        <th>Edit</th>
                                        <th>Delete Title</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.companyName}</td>
                                                <td>{item.contactName}</td>
                                                <th><Button variant="success" onClick={() => handleDisplay(item.id, item.companyName, item.contactName)}>Edit</Button></th>
                                                <th><Button variant="danger" onClick={() => handleDelete(item.id)}>Delete</Button></th>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </>
                    )

                }
            </div>
        )
    }

    export default Suppliers
