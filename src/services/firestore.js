import { db } from '@/config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const buildersData = [
	{
		firstName: 'Thomas',
		lastName: 'Nørregaard',
		title: 'Byggeleder',
		phone: '+45 87 65 43 21',
		email: 'thomas@mileton.dk',
		about: 'Thomas har over 15 års erfaring inden for byggeri og projektledelse.',
		availability: {
			weekdays: '08:00 - 16:00',
			weekend: 'Lukket'
		}
	},
	{
		firstName: 'Morten',
		lastName: 'Kjeldsen',
		title: 'Byggeleder',
		phone: '+45 76 54 32 10',
		email: 'morten@mileton.dk',
		about: 'Morten har specialiseret sig i energirigtige byggerier og moderne arkitektur.',
		availability: {
			weekdays: '07:30 - 15:30',
			weekend: 'Lukket'
		}
	}
];

const usersData = [
	{ firstName: 'Jonas', lastName: 'Hansen', email: 'jonas@mail.dk', phone: '+45 11 22 33 44', role: 'bygherre' },
	{ firstName: 'Sofie', lastName: 'Nielsen', email: 'sofie@mail.dk', phone: '+45 22 33 44 55', role: 'bygherre' },
	{ firstName: 'Mikkel', lastName: 'Andersen', email: 'mikkel@mail.dk', phone: '+45 33 44 55 66', role: 'bygherre' },
	{ firstName: 'Laura', lastName: 'Christensen', email: 'laura@mail.dk', phone: '+45 44 55 66 77', role: 'bygherre' },
	{ firstName: 'Rasmus', lastName: 'Pedersen', email: 'rasmus@mail.dk', phone: '+45 55 66 77 88', role: 'bygherre' },
	{ firstName: 'Emma', lastName: 'Jensen', email: 'emma@mail.dk', phone: '+45 66 77 88 99', role: 'bygherre' },
	{ firstName: 'Mathias', lastName: 'Møller', email: 'mathias@mail.dk', phone: '+45 77 88 99 00', role: 'bygherre' },
	{ firstName: 'Ida', lastName: 'Larsen', email: 'ida@mail.dk', phone: '+45 88 99 00 11', role: 'bygherre' },
	{ firstName: 'Oliver', lastName: 'Thomsen', email: 'oliver@mail.dk', phone: '+45 99 00 11 22', role: 'bygherre' },
	{ firstName: 'Maja', lastName: 'Kristensen', email: 'maja@mail.dk', phone: '+45 00 11 22 33', role: 'bygherre' },
];

const projectsData = [
	{ name: 'Villa Skovvej', address: 'Skovvej 12, Aarhus', progress: 75 },
	{ name: 'Rækkehus Strandgade', address: 'Strandgade 4, København', progress: 45 },
	{ name: 'Parcelhus Bakkely', address: 'Bakkely 7, Odense', progress: 20 },
	{ name: 'Villa Søndergaard', address: 'Søndergaard 3, Aalborg', progress: 90 },
	{ name: 'Enfamiliehus Elmevej', address: 'Elmevej 19, Vejle', progress: 10 },
	{ name: 'Villa Rosenlund', address: 'Rosenlund 8, Esbjerg', progress: 60 },
	{ name: 'Parcelhus Højvang', address: 'Højvang 2, Randers', progress: 35 },
	{ name: 'Villa Storkebakken', address: 'Storkebakken 15, Horsens', progress: 55 },
	{ name: 'Rækkehus Møllevej', address: 'Møllevej 6, Kolding', progress: 80 },
	{ name: 'Enfamiliehus Birkelund', address: 'Birkelund 11, Silkeborg', progress: 15 },
];

export const seedUsers = async () => {
	try {
		// Opret begge byggeledere først
		const builderRefs = [];
		for (const builder of buildersData) {
			const ref = await addDoc(collection(db, 'builders'), builder);
			builderRefs.push(ref);
			//console.log(`Byggeleder oprettet: ${builder.firstName} ${builder.lastName}`);
		}

		for (let i = 0; i < usersData.length; i++) {
			// Fordel byggeledere – første 5 får Thomas, sidste 5 får Morten
			const builderRef = i < 5 ? builderRefs[0] : builderRefs[1];

			// Opret projekt med builderId
			const projectRef = await addDoc(collection(db, 'projects'), {
				...projectsData[i],
				builderId: builderRef.id
			});
			//console.log(`Projekt oprettet: ${projectsData[i].name}`);

			// Opret bruger med projectId
			await addDoc(collection(db, 'users'), {
				...usersData[i],
				projectId: projectRef.id
			});
			//console.log(`Bruger oprettet: ${usersData[i].firstName} ${usersData[i].lastName}`);
		}
		//console.log('✅ Alle data oprettet!');
	} catch (error) {
		//console.error('Fejl:', error);
	}
};