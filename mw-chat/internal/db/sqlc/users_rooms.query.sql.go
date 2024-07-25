// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: users_rooms.query.sql

package db

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

const addUserToRoom = `-- name: AddUserToRoom :one
INSERT INTO users_rooms(user_uuid, room_uuid, user_role, joined_at)
VALUES ($1, $2, $3, $4)
RETURNING user_uuid, user_role
`

type AddUserToRoomParams struct {
	UserUuid pgtype.UUID      `json:"user_uuid"`
	RoomUuid pgtype.UUID      `json:"room_uuid"`
	UserRole UserRoleType     `json:"user_role"`
	JoinedAt pgtype.Timestamp `json:"joined_at"`
}

type AddUserToRoomRow struct {
	UserUuid pgtype.UUID  `json:"user_uuid"`
	UserRole UserRoleType `json:"user_role"`
}

func (q *Queries) AddUserToRoom(ctx context.Context, arg AddUserToRoomParams) (AddUserToRoomRow, error) {
	row := q.db.QueryRow(ctx, addUserToRoom,
		arg.UserUuid,
		arg.RoomUuid,
		arg.UserRole,
		arg.JoinedAt,
	)
	var i AddUserToRoomRow
	err := row.Scan(&i.UserUuid, &i.UserRole)
	return i, err
}