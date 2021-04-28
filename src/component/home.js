import { createContext, useReducer } from 'react';

export const SiswaContext = createContext();

const userReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_SISWA':
            return [
                ...state,
                {
                    "id": Math.random(),
                    "nama": action.siswa.nama,
                    "date": action.siswa.date,
                    "alamat": action.siswa.alamat
                }
            ]
        case 'UPDATE_SISWA':
            return state.map((value) => value.id === Number(action.siswa.id) ? action.siswa : value);
        case 'DELETE_SISWA':
            return state.filter((value) => value.id !== Number(action.id)); //karena langsung id
        case 'SELECT_SISWA':
            return state;

        default:
            return state;
    }
}

const HomePage = ({ children }) => {
    // tahun-bulan-tanggal
    const [siswa, dispatch] = useReducer(userReducer, [
        {
            "id": 1,
            "nama": "Septianton Rezki Rahmatulloh",
            "date": "2021-04-29",
            "alamat": "kediri"
        },
        {
            "id": 2,
            "nama": "Bayu Eka Daman Puri Widodo",
            "date": "2021-04-29",
            "alamat": "Kalimantan"
        },
        {
            "id": 3,
            "nama": "Surya Bintang Diawan",
            "date": "2021-04-29",
            "alamat": "palangkaraya"
        },
        {
            "id": 4,
            "nama": "Muhammad Fajar Rifaldi",
            "date": "2021-04-29",
            "alamat": "Malang"
        }
    ]);

    return (
        <SiswaContext.Provider value={{ siswa, dispatch }}>
            {children}
        </SiswaContext.Provider>
    );
}

export default HomePage;