import { db } from '@/config/firebase'
import { doc, setDoc } from 'firebase/firestore'

const usersData = [
    { uid: 'G84wF1Q1CZWAbK6coANDJmULJxF2', firstName: 'Jonas', lastName: 'Hansen', email: 'jonas@mail.dk', phone: '+45 11 22 33 44', role: 'bygherre', projectId: 'di4dXzBWXZ3HadGjYQL8' },
    { uid: 'tRtrOrJKxsfqzLg7P3dqwpmJ1IJ2', firstName: 'Sofie', lastName: 'Nielsen', email: 'sofie@live.dk', phone: '+45 22 33 44 55', role: 'bygherre', projectId: 'ROdpkbVUhXYYlMUIhRIR' },
    { uid: 'HeGlW29RJTMFzftmtiWmiTzeFPE3', firstName: 'Mikkel', lastName: 'Andersen', email: 'mikkel@mail.dk', phone: '+45 33 44 55 66', role: 'bygherre', projectId: 'uOz9VkWy7KRLZifoRRoO' },
    { uid: 'uxVdCWKIpfXW3dyy5vslhGrguBud2', firstName: 'Laura', lastName: 'Christensen', email: 'laura@mail.dk', phone: '+45 44 55 66 77', role: 'bygherre', projectId: 'ciHkWYvJPBaIVUEM3ea9' },
    { uid: 'YJEon2nfqJMsulR7rin2xvtwJku2', firstName: 'Rasmus', lastName: 'Pedersen', email: 'rasmus@mail.dk', phone: '+45 55 66 77 88', role: 'bygherre', projectId: 'JxV6JnalKyoWMCF7vRA6' },
    { uid: 'qE49H2NyXmSXo6v7nGCN81BQrjy1', firstName: 'Emma', lastName: 'Jensen', email: 'emma@mail.dk', phone: '+45 66 77 88 99', role: 'bygherre', projectId: '4saOtXN8KfOpF3XkAy33' },
    { uid: 'QPVWIbw34aeFcN6LQc1DdNvYBWF3', firstName: 'Mathias', lastName: 'Møller', email: 'mathias@mail.dk', phone: '+45 77 88 99 00', role: 'bygherre', projectId: 'XlB1Qpkao26YsmZHreAK' },
    { uid: 'rKGUPSpvXMVmGZOFQjs3VDJ2pQh2', firstName: 'Ida', lastName: 'Larsen', email: 'ida@mail.dk', phone: '+45 88 99 00 11', role: 'bygherre', projectId: 'IPBfXR6JaAnIm5weYGvm' },
    { uid: 'qUbJQcwcpJQD0YVtpSgfdX47YUZ2', firstName: 'Oliver', lastName: 'Thomsen', email: 'oliver@mail.dk', phone: '+45 99 00 11 22', role: 'bygherre', projectId: 'lJtciAEwnrI6CE0zB8ys' },
    { uid: 'iqIgKKAAgrNO7jUr9S7YxeLTHcY2', firstName: 'Maja', lastName: 'Kristensen', email: 'maja@mail.dk', phone: '+45 00 11 22 33', role: 'bygherre', projectId: 'GpYIGq4PW2zUg9SL8yEa' },
]

export const seedUsersWithUid = async () => {
    try {
        for (const user of usersData) {
            const { uid, ...userData } = user
            await setDoc(doc(db, 'users', uid), userData)
            console.log(`Bruger oprettet: ${user.firstName} ${user.lastName}`)
        }
        console.log('✅ Alle brugere oprettet!')
    } catch (error) {
        console.error('Fejl:', error)
    }
}