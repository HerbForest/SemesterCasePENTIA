/**
 * Genererer initialer fra et for- og efternavn.
 * @function
 * @param {string} firstName - Fornavn
 * @param {string} lastName - Efternavn
 * @returns {string} To bogstavers initialer, eller tom streng hvis input mangler
 */
export const getInitials = (firstName, lastName) => {
	if (!firstName || !lastName) return '';
	return `${firstName[0]}${lastName[0]}`;
};