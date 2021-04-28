import { useContext, useState, useEffect } from 'react';
import { SiswaContext } from './home';

const ListSiswa = () => {

    const [data, setData] = useState({
        "id": "",
        "nama": "",
        "date": "",
        "alamat": ""
    })

    const [nama, setNama] = useState({
        "kondisi": true,
        "peringatan": "Masukkan Nama"
    })
    const [date, setDate] = useState({
        "kondisi": true,
        "peringatan": "Masukkan Tanggal"
    })
    const [alamat, setAlamat] = useState({
        "kondisi": true,
        "peringatan": "Masukkan Alamat"
    })

    const { siswa, dispatch } = useContext(SiswaContext);

    useEffect(() => {

    }, [alamat]);

    useEffect(() => {
    }, [siswa, data]);

    const addOrUpdateSiswa = (e) => {
        e.preventDefault();
        if (data.id === "" && data.nama !== "" && data.date !== "" && data.alamat !== "") {
            dispatch({ type: 'ADD_SISWA', siswa: data })
        }
        else if (data.id !== "" && data.nama !== "" && data.date !== "" && data.alamat !== "") {
            dispatch({ type: 'UPDATE_SISWA', siswa: data })
        }
        handleNama(data.nama);
        handleAlamat(data.alamat);
        handleDate(data.date);
    }

    const updateSiswa = (e) => {
        const filterSiswa = siswa.filter((value) => value.id === Number(e.target.value))[0];
        if (filterSiswa) {
            setData({
                id: filterSiswa.id,
                nama: filterSiswa.nama,
                alamat: filterSiswa.alamat,
                date: filterSiswa.date
            }, () => {
                handleNama(data.nama);
                handleAlamat(data.alamat);
                handleDate(data.date);
            })
        }
    }

    const deleteSiswa = (e) => {
        dispatch({ type: 'DELETE_SISWA', id: e.target.value })
    }

    const handleNama = (value) => {
        if (value === "" || value === null) {
            setNama({
                ...nama,
                kondisi: false
            })
        } else {
            setNama({
                ...nama,
                kondisi: true
            })
        }
    }
    const handleDate = (value) => {
        if (value === "" || value === null) {
            setDate({
                ...date,
                kondisi: false
            })
        } else {
            setDate({
                ...date,
                kondisi: true
            })
        }
    }
    const handleAlamat = (value) => {
        if (value === "" || value === null) {
            setAlamat({
                ...alamat,
                kondisi: false
            })
        } else {
            setAlamat({
                ...alamat,
                kondisi: true
            })
        }
    }

    const handleFocus = (e) => {
        if (e.target.id === "date") {
            handleDate(e.target.value)
        }
        else if (e.target.id === "nama") {
            handleNama(e.target.value)
        }
        else if (e.target.id === "alamat") {
            handleAlamat(e.target.value)
        }
    }

    const handleChange = (e) => {
        if (e.target.id === "date") {
            handleDate(e.target.value)
        }
        else if (e.target.id === "nama") {
            handleNama(e.target.value)
        }
        else if (e.target.id === "alamat") {
            handleAlamat(e.target.value)
        }
        setData({
            ...data,
            [e.target.id]: e.target.value
        });
    }

    return (
        <div style={{ width: "900px" }} className="container">
            <table className="table table-striped text-center">
                <thead>
                    <tr>
                        <th scope="col">Nomer</th>
                        <th scope="col">Nama</th>
                        <th scope="col">Alamat</th>
                        <th scope="col">Tanggal Lahir</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        siswa ? siswa.map((value) => {
                            return (
                                <tr key={value.id}>
                                    <th scope="row">{value.id}</th>
                                    <td>{value.nama}</td>
                                    <td>{value.alamat}</td>
                                    <td>{value.date}</td>
                                    <td>
                                        <button className="btn btn-primary" value={value.id} onClick={updateSiswa}><i className="fas fa-pen-square"></i> Update</button>
                                        <span> || </span>
                                        <button className="btn btn-danger" value={value.id} onClick={deleteSiswa}><i className="fas fa-trash"></i>  Delete</button>
                                    </td>
                                </tr>
                            );
                        }) :
                            <div>You dont have data siswa</div>
                    }
                </tbody>
            </table>
            <form onSubmit={addOrUpdateSiswa}>
                <div className="form-group">
                    <label htmlFor="id">Id</label>
                    <input type="text" className="form-control" id="id" readOnly value={data.id ? data.id : ''} />
                </div>
                <div className="form-group">
                    <label htmlFor="nama">Nama</label>
                    <input type="text" className="form-control" id="nama" placeholder="Masukkan Nama" onFocus={(e) => handleFocus(e)} value={data.nama} onChange={(e) => handleChange(e)} />
                    {
                        nama.kondisi ? "" : <div id="emailHelp" className="form-text text-danger"><i className="fas fa-exclamation-circle"></i> <span>  </span> {nama.peringatan}</div>
                    }

                </div>
                <div className="form-group">
                    <label htmlFor="alamat">Alamat</label>
                    <input type="text" className="form-control" value={data.alamat} id="alamat" placeholder="Masukkan Alamat" onChange={(e) => handleChange(e)} />
                    {
                        alamat.kondisi ? "" : <div id="emailHelp" className="form-text text-danger"><i className="fas fa-exclamation-circle"></i> <span>  </span> {alamat.peringatan}</div>
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="date">Tanggal Lahir</label>
                    <input type="date" className="form-control" value={data.date} id="date" placeholder="Masukkan Tanggal Lahir" onChange={(e) => handleChange(e)} />
                    {
                        date.kondisi ? "" : <div id="emailHelp" className="form-text text-danger"> <i className="fas fa-exclamation-circle"></i> <span>  </span> {date.peringatan}</div>
                    }
                </div>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
        </div>
    );
}

export default ListSiswa;