import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import ModalMenuItem from '../ModalMenuItem'
import MenuItem from '../MenuList/components/MenuItem'
import generateUUID from 'utils/generateUUID'

const MenuListFooter = ({ menuName, listMenuItems, noSubmenu, updateListMenu, haveImage }) => {
    const [openModalMenu, setOpenModalMenu] = useState(false)
    const [listMenu, setListMenu] = useState([])
    const [parentMenuId, setParentMenuId] = useState(null)
    const [currentMenuItem, setCurrentMenuItem] = useState(null)

    useEffect(() => {
        let newListMenuItems = [...listMenuItems]
        newListMenuItems = newListMenuItems?.map((item) => {
            const itemid = item.id || generateUUID();
            return ({
                ...item,
                id: itemid,
            });
        })
        setListMenu(newListMenuItems)
    }, [listMenuItems])

    const handleUpdateMenu = (data, isUpdate) => {
        if (data?.parentMenuId) {
            const menuItemParent = listMenu?.find((it) => it?.id === data?.parentMenuId)
            if (menuItemParent) {
                let newListChildMenu = [];
                const menuChild = menuItemParent?.child || [];
                if (isUpdate) {
                    const listChildMenuOld = menuChild?.filter((it) => it?.id !== data?.id)
                    newListChildMenu = [
                        ...listChildMenuOld,
                        data
                    ]
                } else {
                    newListChildMenu = [
                        ...menuChild,
                        data,
                    ]
                }
                const listMenuOld = listMenu?.filter((it) => it?.id !== data?.parentMenuId)
                const newListMenu = [
                    ...listMenuOld,
                    {
                        ...menuItemParent,
                        child: [...newListChildMenu]
                    }
                ]
                setListMenu(newListMenu);
            }
        } else {
            let newListMenu = [];
            if (isUpdate) {
                const listMenuOld = listMenu?.filter((it) => it?.id !== data?.id)
                newListMenu = [
                    ...listMenuOld,
                    data
                ]
            } else {
                newListMenu = [
                    ...listMenu,
                    data,
                ]
            }
            setListMenu(newListMenu);
        }
    }

    const onCloseModal = () => {
        setOpenModalMenu(false)
        setCurrentMenuItem(null)
        setParentMenuId(null)
    }

    const onShowModal = () => {
        setCurrentMenuItem(null)
        setParentMenuId(null)
        setOpenModalMenu(true);
    };

    const handleEditMenu = (item) => {
        setCurrentMenuItem(item)
        setParentMenuId(item?.parentMenuId || null)
        setOpenModalMenu(true)
    }

    const handleDeleteMenu = (id, parentMenuId) => {
        if (parentMenuId) {
            const menuItemParent = listMenu?.find((it) => it?.id === parentMenuId)
            const listChild = menuItemParent?.child?.filter((it) => it?.id !== id)
            const listMenuOld = listMenu?.filter((it) => it?.id !== parentMenuId)
            const newListMenu = [
                ...listMenuOld,
                {
                    ...menuItemParent,
                    child: [...listChild],
                }

            ]
            setListMenu(newListMenu)
        } else {
            const newListMenu = listMenu?.filter((it) => it?.id !== id)
            setListMenu(newListMenu);
        }
    }

    const handleAddSubmenu = (id) => {
        setParentMenuId(id)
        setOpenModalMenu(true)
    }

    useEffect(() => {
        updateListMenu(listMenu, menuName)
    }, [listMenu])

    return (
        <div className="setting-form setting-menu-list">
            <div className='button-add-wrapper'>
                <Button type="primary" onClick={onShowModal} className="button-add">Add Menu Item</Button>
            </div>
            <ModalMenuItem open={openModalMenu} onClose={onCloseModal} handleUpdateMenu={handleUpdateMenu} parentMenuId={parentMenuId} currentMenuItem={currentMenuItem} haveImage={haveImage} />

            <ul className="listMenu">
                {
                    listMenu?.sort((a, b) => {
                        return (a?.order || 0) - (b?.order || 0);
                    })?.map((item) => {
                        return (
                            <MenuItem key={item?.id} item={item} handleEditMenu={handleEditMenu} handleDeleteMenu={handleDeleteMenu} handleAddSubmenu={handleAddSubmenu} noActions={noSubmenu} />
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default MenuListFooter