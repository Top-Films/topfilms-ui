export interface UserById {
	userById: {
		id: string,
		username: string,
		firstName: string,
		lastName: string,
		createdAt?: Date,
		modified?: Date
	}
}

export interface UserInput {
	id: string,
	username: string,
	firstName: string,
	lastName: string
}