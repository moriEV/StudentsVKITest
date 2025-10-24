import AppDataSource from './AppDataSource';
import { Group } from './entity/Group.entity';
import type GroupInterface from '@/types/GroupInterface';


/**
 * Получение групп
 * @returns  Promise<GroupInterface[]>
 */
export const getGroupsDb = async (): Promise<GroupInterface[]> => {
  const groupRepository = AppDataSource.getRepository(Group);
  return await groupRepository.find();
};

/**
 * Добавление группы
 * @returns  Promise<GroupInterface>
 */
export const addGroupsDb = async (groupFields: Omit<GroupInterface, 'id'>): Promise<GroupInterface> => {
  const groupRepository = AppDataSource.getRepository(Group);
  const group = new Group();
  Object.assign(group, groupFields);
  return await groupRepository.save(group);
};
