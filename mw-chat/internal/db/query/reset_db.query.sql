-- name: RemoveEverything :exec
TRUNCATE TABLE message_status, messages, users_rooms, rooms RESTART IDENTITY CASCADE;

-- name: RegenerateDbData :exec
DO $$
BEGIN
INSERT INTO "rooms" ("uuid", "name", "type")
VALUES
    ('78bdf878-3b83-4f97-8d2e-928c132a10cd', NULL, 'private'),
    ('7c3a2511-c938-4a60-a9db-406e18bfeec0', NULL, 'private'),
    ('b7a3664c-f5ed-4cb0-aa2e-b2c758d22b55', NULL, 'private'),
    ('4f85694e-ff29-478f-90e9-1581577dfa84', NULL, 'private'),
    ('e57fc491-69f7-4b30-9979-78879c8873bf', NULL, 'private'),
    ('897f4a0f-fe31-4036-8358-f89a19c9bda6', NULL, 'private'),
    ('85f610df-9f86-4c55-8ee1-02485d42defb', NULL, 'private');

INSERT INTO "users_rooms" ("user_uuid", "room_uuid", "user_role", "is_room_blocked")
VALUES
    ('d2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2', '78bdf878-3b83-4f97-8d2e-928c132a10cd', 'regular', false),
    ('3d922e8a-5d58-4b82-9a3d-83e2e73b3f91', '78bdf878-3b83-4f97-8d2e-928c132a10cd', 'regular', false),

    ('d2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2', '7c3a2511-c938-4a60-a9db-406e18bfeec0', 'regular', false),
    ('1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1', '7c3a2511-c938-4a60-a9db-406e18bfeec0', 'regular', false),

    ('110f00b8-19e4-4cf4-a5f1-77b298bf0876', 'b7a3664c-f5ed-4cb0-aa2e-b2c758d22b55', 'regular', false),
    ('e93f8494-0c5c-420d-a68e-5d43903a80f2', 'b7a3664c-f5ed-4cb0-aa2e-b2c758d22b55', 'regular', false),

    ('b6eb9dd1-944c-4d1d-bc09-7c9933c53bab', '4f85694e-ff29-478f-90e9-1581577dfa84', 'regular', false),
    ('b51f6b20-9404-403b-8d48-1c0ab7d51340', '4f85694e-ff29-478f-90e9-1581577dfa84', 'regular', false),

    ('d63d2f89-6412-4324-8587-7061bf02dca4', 'e57fc491-69f7-4b30-9979-78879c8873bf', 'regular', false),
    ('c31384a6-b811-4a1f-befa-95dd53e3f4b9', 'e57fc491-69f7-4b30-9979-78879c8873bf', 'regular', false),

    ('d63d2f89-6412-4324-8587-7061bf02dca4', '897f4a0f-fe31-4036-8358-f89a19c9bda6', 'regular', false),
    ('5a31e3cb-7e9a-41e5-9a3b-1f1e5d6b7c3e', '897f4a0f-fe31-4036-8358-f89a19c9bda6', 'regular', false),

    ('d63d2f89-6412-4324-8587-7061bf02dca4', '85f610df-9f86-4c55-8ee1-02485d42defb', 'regular', false),
    ('8a3d1fe1-42da-499a-bf64-248297fd670a', '85f610df-9f86-4c55-8ee1-02485d42defb', 'regular', false);

INSERT INTO "messages" ("uuid", "owner_uuid", "room_uuid", "text")
VALUES
    ('7939af01-e785-445d-b79d-70a433979c7b', 'd2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2', '78bdf878-3b83-4f97-8d2e-928c132a10cd', 'Test message 1'),
    ('91be5d99-eddf-4949-bf15-b4cee3989fa6', '3d922e8a-5d58-4b82-9a3d-83e2e73b3f91', '78bdf878-3b83-4f97-8d2e-928c132a10cd', 'Test message 2'),

    ('88a6d503-a03b-412c-bfab-06649e49d62d', 'd2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2', '78bdf878-3b83-4f97-8d2e-928c132a10cd', 'Test message 3'),
    ('6cea59ef-f0d4-4d8c-aa12-e48a746c93d0', '3d922e8a-5d58-4b82-9a3d-83e2e73b3f91', '78bdf878-3b83-4f97-8d2e-928c132a10cd', 'Test message 4'),

    ('aa9b5ca2-27af-494e-b1cb-20e9ec9d9ee8', 'd2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2', '7c3a2511-c938-4a60-a9db-406e18bfeec0', 'Test message 5'),
    ('516394b3-0748-4e5e-9c5f-6d9e8e6ba0b1', '1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1', '7c3a2511-c938-4a60-a9db-406e18bfeec0', 'Test message 6'),

    ('3b5503c0-1ffa-4df7-8a3c-56535ce67422', '110f00b8-19e4-4cf4-a5f1-77b298bf0876', 'b7a3664c-f5ed-4cb0-aa2e-b2c758d22b55', 'Test message 7'),
    ('f6713833-4bc9-4a7a-b9e1-0bb797a52ef0', 'e93f8494-0c5c-420d-a68e-5d43903a80f2', 'b7a3664c-f5ed-4cb0-aa2e-b2c758d22b55', 'Test message 8'),

    ('8f7d6113-527f-44d9-a1db-53721653ba89', 'b6eb9dd1-944c-4d1d-bc09-7c9933c53bab', '4f85694e-ff29-478f-90e9-1581577dfa84', 'Test message 9'),
    ('b0532e85-84dc-4ab8-ae4d-b2c418c9f849', 'b51f6b20-9404-403b-8d48-1c0ab7d51340', '4f85694e-ff29-478f-90e9-1581577dfa84', 'Test message 10'),

    ('667f090a-0095-4884-bddc-c99c3fcc628d', 'd63d2f89-6412-4324-8587-7061bf02dca4', 'e57fc491-69f7-4b30-9979-78879c8873bf', 'Test message 11'),
    ('4f5d0404-d6bf-47a6-9f56-b7e3bb88a605', 'c31384a6-b811-4a1f-befa-95dd53e3f4b9', 'e57fc491-69f7-4b30-9979-78879c8873bf', 'Test message 12'),

    ('62a0c033-7206-4d21-9f7f-2246a4cdb0c2', 'd63d2f89-6412-4324-8587-7061bf02dca4', '897f4a0f-fe31-4036-8358-f89a19c9bda6', 'Test message 13'),
    ('dd02d5b3-5377-4f73-81a0-8119a208ea58', '5a31e3cb-7e9a-41e5-9a3b-1f1e5d6b7c3e', '897f4a0f-fe31-4036-8358-f89a19c9bda6', 'Test message 14'),

    ('b2ab09d5-7dcc-434d-9714-bb56cc71a2a8', 'd63d2f89-6412-4324-8587-7061bf02dca4', '85f610df-9f86-4c55-8ee1-02485d42defb', 'Test message 15'),
    ('c19faf46-6ddc-41ef-9260-16bf19372cc9', '8a3d1fe1-42da-499a-bf64-248297fd670a', '85f610df-9f86-4c55-8ee1-02485d42defb', 'Test message 16');

INSERT INTO "message_status" ("message_uuid", "receiver_uuid", "is_read")
VALUES
    ('7939af01-e785-445d-b79d-70a433979c7b', '3d922e8a-5d58-4b82-9a3d-83e2e73b3f91', false),
    ('91be5d99-eddf-4949-bf15-b4cee3989fa6', 'd2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2' , false),

    ('88a6d503-a03b-412c-bfab-06649e49d62d', '3d922e8a-5d58-4b82-9a3d-83e2e73b3f91', false),
    ('6cea59ef-f0d4-4d8c-aa12-e48a746c93d0', 'd2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2' , false),

    ('aa9b5ca2-27af-494e-b1cb-20e9ec9d9ee8', '1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1', false),
    ('516394b3-0748-4e5e-9c5f-6d9e8e6ba0b1', 'd2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2', false),

    ('3b5503c0-1ffa-4df7-8a3c-56535ce67422', 'e93f8494-0c5c-420d-a68e-5d43903a80f2', false),
    ('f6713833-4bc9-4a7a-b9e1-0bb797a52ef0', '110f00b8-19e4-4cf4-a5f1-77b298bf0876', false),

    ('8f7d6113-527f-44d9-a1db-53721653ba89', 'b51f6b20-9404-403b-8d48-1c0ab7d51340', false),
    ('b0532e85-84dc-4ab8-ae4d-b2c418c9f849', 'b6eb9dd1-944c-4d1d-bc09-7c9933c53bab', false),

    ('667f090a-0095-4884-bddc-c99c3fcc628d', 'c31384a6-b811-4a1f-befa-95dd53e3f4b9', false),
    ('4f5d0404-d6bf-47a6-9f56-b7e3bb88a605', 'd63d2f89-6412-4324-8587-7061bf02dca4', false),

    ('62a0c033-7206-4d21-9f7f-2246a4cdb0c2', '5a31e3cb-7e9a-41e5-9a3b-1f1e5d6b7c3e', false),
    ('dd02d5b3-5377-4f73-81a0-8119a208ea58', 'd63d2f89-6412-4324-8587-7061bf02dca4', false),

    ('b2ab09d5-7dcc-434d-9714-bb56cc71a2a8', '8a3d1fe1-42da-499a-bf64-248297fd670a', false),
    ('c19faf46-6ddc-41ef-9260-16bf19372cc9', 'd63d2f89-6412-4324-8587-7061bf02dca4', false);

END $$;