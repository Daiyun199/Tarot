

export enum Roles {
    Customer = 0,
    Admin = 1,
    Reader = 2,
    Staff = 3,
}

// src/model/Roles.ts

export function getRoleName(roleValue: number | string | undefined): string {
    if (roleValue === undefined || roleValue === null) {
        return 'Unknown Role';
    }

    let roleNumber: number;

    if (typeof roleValue === 'string') {
        roleNumber = Number(roleValue);
        if (isNaN(roleNumber)) {
            return 'Unknown Role';
        }
    } else {
        roleNumber = roleValue;
    }

    switch (roleNumber) {
        case Roles.Customer:
            return 'Customer';
        case Roles.Admin:
            return 'Admin';
        case Roles.Reader:
            return 'Reader';
        case Roles.Staff:
            return 'Staff';
        default:
            return 'Unknown Role';
    }
}
