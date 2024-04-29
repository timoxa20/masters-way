import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {SchemasWayPlainResponse} from "src/apiAutogenerated";
import {Button, ButtonType} from "src/component/button/Button";
import {Confirm} from "src/component/confirm/Confirm";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Loader} from "src/component/loader/Loader";
import {Modal} from "src/component/modal/Modal";
import {PromptModalContent} from "src/component/modal/PromptModalContent";
import {displayNotification} from "src/component/notification/displayNotification";
import {Tag} from "src/component/tag/Tag";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {FavoriteUserDAL} from "src/dataAccessLogic/FavoriteUserDAL";
import {UserDAL} from "src/dataAccessLogic/UserDAL";
import {UserTagDAL} from "src/dataAccessLogic/UserTagDAL";
import {WayCollectionDAL} from "src/dataAccessLogic/WayCollectionDAL";
import {WayCollectionWayDAL} from "src/dataAccessLogic/WayCollectionWayDAL";
import {WayDAL} from "src/dataAccessLogic/WayDAL";
import {useGlobalContext} from "src/GlobalContext";
import {useLoad} from "src/hooks/useLoad";
import {usePersistanceState} from "src/hooks/usePersistanceState";
import {BaseWaysTable, FILTER_STATUS_ALL_VALUE} from "src/logic/waysTable/BaseWaysTable";
import {WayStatusType} from "src/logic/waysTable/wayStatus";
import {User, WayCollection} from "src/model/businessModel/User";
import {UserTag} from "src/model/businessModelPreview/UserNotSaturatedWay";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LangauageService";
import {UserPageSettings, View} from "src/utils/LocalStorageWorker";
import {PartialWithId, PartialWithUuid} from "src/utils/PartialWithUuid";
import {Symbols} from "src/utils/Symbols";
import styles from "src/logic/userPage/UserPage.module.scss";

/**
 * Update User params
 */
export interface UpdateUserParams {

  /**
   * User to update
   */
  userToUpdate: PartialWithUuid<User>;

  /**
   * Callback to update user
   */
  setUser: (user: PartialWithUuid<User>) => void;
}

/**
 * Update user
 */
export const updateUser = async (params: UpdateUserParams) => {
  params.setUser(params.userToUpdate);
  await UserDAL.updateUser(params.userToUpdate);
};

/**
 * User Page Props
 */
interface UserPageProps {

  /**
   * User's uuid
   */
  uuid: string;
}

/**
 * Default ways collections
 */
enum DefaultCollections {
  OWN = "own",
  MENTORING = "mentoring",
  FAVORITE = "favorite",
}

const DEFAULT_USER_PAGE_SETTINGS: UserPageSettings = {
  filterStatus: FILTER_STATUS_ALL_VALUE,
  view: View.Card,
};

/**
 * Safe opened tab from localStorage
 */
const userPageSettingsValidator = (openedTabId: string, allCollections: WayCollection[]) => {
  const isTabExist = openedTabId
    && allCollections.some(collection => collection.uuid === openedTabId);

  return !!isTabExist;
};

/**
 * Check is user in favorites
 */
const getIsUserInFavorites = (
  user: User | null,
  pageOwner: User,
) => (user?.favoriteUsers ?? []).map(plainUser => plainUser.uuid).includes(pageOwner.uuid);

/**
 * User page
 */
export const UserPage = (props: UserPageProps) => {
  const {user, setUser, language} = useGlobalContext();
  const [isRenameCollectionModalOpen, setIsRenameCollectionModalOpen] = useState(false);
  const [isAddUserTagModalOpen, setIsAddUserTagModalOpen] = useState(false);

  const [userPageOwner, setUserPageOwner] = useState<User>();
  const [openedTabId, setOpenedTabId] = usePersistanceState({
    key: "userPage.openedTabId",
    defaultValue: DefaultCollections.OWN,

    /**
     * Check is stored data valid
     */
    storedDataValidator: (
      currentValue: string,
    ) => userPageOwner?.wayCollections
      ? userPageSettingsValidator(currentValue, userPageOwner.wayCollections)
      : true,
    dependencies: [userPageOwner],
  });
  const [userPageSettings,, updateUserPageSettings] = usePersistanceState({
    key: "userPage",
    defaultValue: DEFAULT_USER_PAGE_SETTINGS,
  });

  /**
   * Update userPreview state
   */
  const setUserPreviewPartial = (updatedUser: Partial<User>) => {
    setUserPageOwner((prevUser?: User) => {
      if (!prevUser) {
        throw new Error("Previous user is undefined");
      }

      return {...prevUser, ...updatedUser};
    });
  };

  const navigate = useNavigate();
  const isPageOwner = !!user && !!userPageOwner && user.uuid === userPageOwner.uuid;

  /**
   * Callback that is called to fetch data
   */
  const loadData = async (): Promise<User> => {
    const fetchedUser = user?.uuid === props.uuid
      ? user
      : await UserDAL.getUserByUuid(props.uuid);

    return fetchedUser;
  };

  /**
   * Callback that is called to validate data
   */
  const validateData = (data: User) => {
    return !!data;
  };

  /**
   * Callback that is called on fetch or validation error
   */
  const onError = (error: Error) => {
    throw (error);
  };

  /**
   * Callback that is called on fetch and validation success
   */
  const onSuccess = (data: User) => {
    setUserPageOwner(data);
  };

  useLoad({
    loadData,
    validateData,
    onSuccess,
    onError,
    dependency: [props.uuid],
  },
  );

  if (!userPageOwner || !userPageSettings) {
    return (
      <Loader />
    );
  }

  const currentCollection = userPageOwner.wayCollections.find((col) => col.uuid === openedTabId);
  const isCustomCollection = currentCollection && currentCollection.type === "custom";
  const defaultCollection = userPageOwner.wayCollections.find((col) => col.type === "own");

  if (!defaultCollection) {
    throw new Error("Default collection is not exist");
  }
  if (!currentCollection) {
    setOpenedTabId(defaultCollection.uuid);
  }

  /**
   * Create way
   */
  const createWay = async (owner: User) => {
    const newWay: SchemasWayPlainResponse = await WayDAL.createWay(owner);
    await WayCollectionWayDAL.createWayCollectionWay(defaultCollection.uuid, newWay.uuid);
    navigate(pages.way.getPath({uuid: newWay.uuid}));
  };

  /**
   * Create collection
   */
  const createCustomWayCollection = async () => {
    if (!user) {
      throw new Error("User is not defined");
    }
    const newWayCollection = await WayCollectionDAL.createWayCollection(user.uuid);

    const updatedCustomWayCollections = user.wayCollections.concat(newWayCollection);

    setUserPreviewPartial({wayCollections: updatedCustomWayCollections});
    setUser({...user, wayCollections: updatedCustomWayCollections});

    setOpenedTabId(newWayCollection.uuid);
  };

  /**
   * Delete custom way collection
   */
  const deleteCustomWayCollections = async (collectionId: string) => {
    if (!user) {
      throw new Error("User is not defined");
    }
    const updatedCustomWayCollections = user.wayCollections
      .filter(collection => collection.uuid !== collectionId);

    await WayCollectionDAL.deleteWayCollection(collectionId);
    setUserPreviewPartial({wayCollections: updatedCustomWayCollections});
    setUser({...user, wayCollections: updatedCustomWayCollections});

    setOpenedTabId(DefaultCollections.OWN);
  };

  /**
   * Update custom way collectionsetUserPreview
   */
  const updateCustomWayCollection = async (wayCollectionToUpdate: PartialWithId<WayCollection>) => {
    if (!user) {
      throw new Error("User is not defined");
    }

    const updatedCustomWayCollections = user.wayCollections
      .map(collection => {
        if (collection.uuid === wayCollectionToUpdate.id) {
          return {...collection, ...wayCollectionToUpdate};
        } else {
          return collection;
        }
      });

    await WayCollectionDAL.updateWayCollection(wayCollectionToUpdate.id, userPageOwner.uuid, wayCollectionToUpdate.name ?? "");
    setUserPreviewPartial({wayCollections: updatedCustomWayCollections});
    setUser({...user, wayCollections: updatedCustomWayCollections});

    setOpenedTabId(wayCollectionToUpdate.id);
  };

  if (!currentCollection) {
    return (
      <>
        <Loader />
        No collection
      </>
    );
  }

  return (
    <VerticalContainer className={styles.pageLayout}>
      <HorizontalGridContainer className={styles.container}>
        <VerticalContainer className={styles.descriptionSection}>
          <VerticalContainer className={styles.nameEmailSection}>
            <HorizontalContainer className={styles.nameSection}>
              <Title
                level={HeadingLevel.h2}
                text={userPageOwner.name}
                onChangeFinish={(name) => updateUser({
                  userToUpdate: {
                    uuid: userPageOwner.uuid,
                    name,
                  },
                  setUser: setUserPreviewPartial,
                })}
                isEditable={isPageOwner}
                className={styles.ownerName}
              />
              <Tooltip
                content={getIsUserInFavorites(user, userPageOwner)
                  ? LanguageService.user.personalInfo.deleteFromFavoritesTooltip[language]
                  : LanguageService.user.personalInfo.addToFavoritesTooltip[language]}
                position={PositionTooltip.LEFT}
              >
                <Button
                  value={`${getIsUserInFavorites(user, userPageOwner)
                    ? Symbols.STAR
                    : Symbols.OUTLINED_STAR
                  }${Symbols.NO_BREAK_SPACE}${userPageOwner.favoriteForUserUuids.length}`}
                  onClick={() => {
                    if (!user) {
                      return;
                    }

                    if (getIsUserInFavorites(user, userPageOwner)) {
                      FavoriteUserDAL.deleteFavoriteUser({
                        donorUserUuid: user.uuid,
                        acceptorUserUuid: userPageOwner.uuid,
                      });
                      const updatedUser = new User({
                        ...user,
                        favoriteUsers: user.favoriteUsers.filter(
                          favoriteUser => favoriteUser.uuid !== userPageOwner.uuid,
                        ),
                      });
                      setUser(updatedUser);
                      const updatedPageOwner = new User({
                        ...userPageOwner,
                        favoriteForUserUuids: userPageOwner.favoriteForUserUuids.filter(
                          favoriteUserUuid => favoriteUserUuid !== user.uuid,
                        ),
                      });
                      setUserPageOwner(updatedPageOwner);

                    } else {
                      FavoriteUserDAL.createFavoriteUser({
                        donorUserUuid: user.uuid,
                        acceptorUserUuid: userPageOwner.uuid,
                      });

                      const updatedUser = new User({
                        ...user,
                        favoriteUsers: [...user.favoriteUsers, userPageOwner],
                      });
                      setUser(updatedUser);
                      const updatedPageOwner = new User({
                        ...userPageOwner,
                        favoriteForUserUuids: [...userPageOwner.favoriteForUserUuids, user.uuid],
                      });
                      setUserPageOwner(updatedPageOwner);

                    }

                    displayNotification({
                      text: getIsUserInFavorites(user, userPageOwner)
                        ? LanguageService.user.notifications.userRemovedFromFavorites[language]
                        : LanguageService.user.notifications.userAddedToFavorites[language],
                      type: "info",
                    });
                  }}
                  buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
                />
              </Tooltip>

            </HorizontalContainer>
            <Title
              level={HeadingLevel.h3}
              text={userPageOwner.email}
              onChangeFinish={(email) => updateUser({
                userToUpdate: {
                  uuid: userPageOwner.uuid,
                  email,
                },
                setUser: setUserPreviewPartial,
              })}
              isEditable={isPageOwner}
              classNameHeading={styles.ownerEmail}
            />

            <HorizontalContainer className={styles.userTagsContainer}>
              {user?.tags.map(tag => (
                <Tag
                  tagName={tag.name}
                  key={tag.uuid}
                  isDeletable={isPageOwner}
                  onDelete={() => {
                    UserTagDAL.deleteUserTag({userTagId: tag.uuid, userId: user.uuid});
                    const updatedUserTags = user.tags.filter(oldTag => oldTag.uuid !== tag.uuid);
                    const updatedUser = new User({...user, tags: updatedUserTags});
                    setUser(updatedUser);
                  }}
                />
              ))}
              {!user?.tags.length && LanguageService.way.wayInfo.noTags[language]}
              {isPageOwner && (
                <Modal
                  isOpen={isAddUserTagModalOpen}
                  trigger={
                    <Tooltip content={LanguageService.user.personalInfo.addSkills[language]}>
                      <Button
                        icon={
                          <Icon
                            size={IconSize.SMALL}
                            name="PlusIcon"
                          />
                        }
                        onClick={() => {}}
                        buttonType={ButtonType.ICON_BUTTON}
                      />
                    </Tooltip>
                  }
                  content={
                    <PromptModalContent
                      defaultValue=""
                      placeholder="New skill"
                      close={() => setIsAddUserTagModalOpen(false)}
                      onOk={async (tagName: string) => {
                        const newTagRaw = await UserTagDAL.createUserTag({name: tagName, ownerUuid: user.uuid});
                        const newTag: UserTag = {name: newTagRaw.name, uuid: newTagRaw.uuid};
                        const updatedUserTags = [...user.tags, newTag];
                        const updatedUser = new User({...user, tags: updatedUserTags});
                        setUser(updatedUser);
                      }}
                      okButtonValue={LanguageService.modals.promptModal.okButton[language]}
                      cancelButtonValue={LanguageService.modals.promptModal.cancelButton[language]}
                    />
                  }
                />
              )}
            </HorizontalContainer>
          </VerticalContainer>

          <VerticalContainer className={styles.userDescriptionSection}>
            <Title
              level={HeadingLevel.h3}
              text={LanguageService.user.personalInfo.about[language]}
            />
            <EditableTextarea
              text={userPageOwner.description}
              onChangeFinish={(description) => updateUser({
                userToUpdate: {
                  uuid: userPageOwner.uuid,
                  description,
                },
                setUser: setUserPreviewPartial,
              })}
              isEditable={isPageOwner}
              className={styles.userDescription}
            />
          </VerticalContainer>

          {isPageOwner &&
            <Button
              value={LanguageService.user.personalInfo.createNewWayButton[language]}
              onClick={() => createWay(user)}
              buttonType={ButtonType.PRIMARY}
            />
          }
        </VerticalContainer>

        <div className={styles.tabsSectionContainer}>
          <HorizontalContainer className={styles.tabsSection}>
            {userPageOwner.wayCollections.map(collection => (
              <Button
                key={collection.uuid}
                value={`${collection.name} (${collection.ways.length})`}
                onClick={() => setOpenedTabId(collection.uuid)}
                className={styles.collectionButton}
                buttonType={collection.uuid === openedTabId ? ButtonType.PRIMARY : ButtonType.SECONDARY}
              />
            ))}

            {isPageOwner && (
              <Button
                value={LanguageService.user.collections.addCollection[language]}
                onClick={createCustomWayCollection}
                className={styles.collectionButton}
                buttonType={ButtonType.SECONDARY}
              />
            )}

          </HorizontalContainer>
        </div>
      </HorizontalGridContainer>

      {isCustomCollection && isPageOwner && (
        <HorizontalContainer className={styles.temporalBlock}>
          <Confirm
            trigger={
              <Button
                value={LanguageService.user.collections.deleteCollection[language]}
                onClick={() => {}}
                buttonType={ButtonType.SECONDARY}
                className={styles.button}
              />
            }
            content={<p>
              {`${LanguageService.user.collections.deleteCollectionModalQuestion[language]} "${currentCollection.name}" ?`}
            </p>}
            onOk={() => deleteCustomWayCollections(currentCollection.uuid)}
            okText={LanguageService.modals.confirmModal.deleteButton[language]}
            cancelText={LanguageService.modals.confirmModal.cancelButton[language]}
          />
          <Modal
            isOpen={isRenameCollectionModalOpen}
            content={
              <PromptModalContent
                defaultValue={currentCollection.name}
                placeholder="Collection name"
                close={() => setIsRenameCollectionModalOpen(false)}
                onOk={(name: string) => updateCustomWayCollection({id: openedTabId, name})}
                okButtonValue={LanguageService.modals.promptModal.okButton[language]}
                cancelButtonValue={LanguageService.modals.promptModal.cancelButton[language]}
              />
            }
            trigger={
              <Button
                value={LanguageService.user.collections.renameCollection[language]}
                onClick={() => setIsRenameCollectionModalOpen(true)}
              />
            }
          />
        </HorizontalContainer>
      )}

      {/* Render table only for appropriate collection */}
      {userPageOwner.wayCollections
        .filter(collection => collection.uuid === openedTabId)
        .map(collection => {

          return (
            <BaseWaysTable
              key={collection.uuid}
              title={collection.name}
              ways={collection.ways}
              updateCollection={isCustomCollection
                ? (wayCollection: Partial<WayCollection>) => updateCustomWayCollection({id: collection.uuid, ...wayCollection})
                : undefined
              }
              filterStatus={userPageSettings.filterStatus}
              setFilterStatus={(
                filterStatus: WayStatusType | typeof FILTER_STATUS_ALL_VALUE,
              ) => updateUserPageSettings({filterStatus})}
              view={userPageSettings.view}
              setView={(view: View) => updateUserPageSettings({view})}
            />
          );
        })}

    </VerticalContainer>
  );
};
