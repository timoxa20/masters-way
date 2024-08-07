// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: favorite_users.query.sql

package db

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

const createFavoriteUser = `-- name: CreateFavoriteUser :one
INSERT INTO favorite_users(
    donor_user_uuid,
    acceptor_user_uuid
) VALUES (
    $1, $2
) RETURNING donor_user_uuid, acceptor_user_uuid
`

type CreateFavoriteUserParams struct {
	DonorUserUuid    pgtype.UUID `json:"donor_user_uuid"`
	AcceptorUserUuid pgtype.UUID `json:"acceptor_user_uuid"`
}

func (q *Queries) CreateFavoriteUser(ctx context.Context, arg CreateFavoriteUserParams) (FavoriteUser, error) {
	row := q.db.QueryRow(ctx, createFavoriteUser, arg.DonorUserUuid, arg.AcceptorUserUuid)
	var i FavoriteUser
	err := row.Scan(&i.DonorUserUuid, &i.AcceptorUserUuid)
	return i, err
}

const deleteFavoriteUserByIds = `-- name: DeleteFavoriteUserByIds :exec
DELETE FROM favorite_users
WHERE donor_user_uuid = $1 AND acceptor_user_uuid = $2
`

type DeleteFavoriteUserByIdsParams struct {
	DonorUserUuid    pgtype.UUID `json:"donor_user_uuid"`
	AcceptorUserUuid pgtype.UUID `json:"acceptor_user_uuid"`
}

func (q *Queries) DeleteFavoriteUserByIds(ctx context.Context, arg DeleteFavoriteUserByIdsParams) error {
	_, err := q.db.Exec(ctx, deleteFavoriteUserByIds, arg.DonorUserUuid, arg.AcceptorUserUuid)
	return err
}

const getFavoriteUserByDonorUserId = `-- name: GetFavoriteUserByDonorUserId :many
SELECT
    users.uuid,
    users.name,
    users.email,
    users.description,
    users.created_at,
    users.image_url,
    users.is_mentor
FROM favorite_users
JOIN users
    ON favorite_users.donor_user_uuid = $1
    AND favorite_users.acceptor_user_uuid = users.uuid
`

func (q *Queries) GetFavoriteUserByDonorUserId(ctx context.Context, donorUserUuid pgtype.UUID) ([]User, error) {
	rows, err := q.db.Query(ctx, getFavoriteUserByDonorUserId, donorUserUuid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []User{}
	for rows.Next() {
		var i User
		if err := rows.Scan(
			&i.Uuid,
			&i.Name,
			&i.Email,
			&i.Description,
			&i.CreatedAt,
			&i.ImageUrl,
			&i.IsMentor,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getFavoriteUserUuidsByAcceptorUserId = `-- name: GetFavoriteUserUuidsByAcceptorUserId :many
SELECT favorite_users.donor_user_uuid FROM favorite_users
WHERE favorite_users.acceptor_user_uuid = $1
`

func (q *Queries) GetFavoriteUserUuidsByAcceptorUserId(ctx context.Context, acceptorUserUuid pgtype.UUID) ([]pgtype.UUID, error) {
	rows, err := q.db.Query(ctx, getFavoriteUserUuidsByAcceptorUserId, acceptorUserUuid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []pgtype.UUID{}
	for rows.Next() {
		var donor_user_uuid pgtype.UUID
		if err := rows.Scan(&donor_user_uuid); err != nil {
			return nil, err
		}
		items = append(items, donor_user_uuid)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}
