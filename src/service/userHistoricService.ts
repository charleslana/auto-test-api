import crypto from 'crypto';
import fs from 'fs';
import HandlerError from '../handler/handlerError';
import HandlerSuccess from '../handler/handlerSuccess';
import IHistoric from '../interface/IHistoric';
import IHistoricPaginated from '../interface/IHistoricPaginated';
import UserHistoricModel from '../model/userHistoricModel';
import { formatDate, translateEnumValue } from '../utils/utils';
import { Optional, WhereOptions } from 'sequelize';
import { Workbook, Worksheet } from 'exceljs';

export default class UserHistoricService {
  public static async save(model: UserHistoricModel): Promise<void> {
    await UserHistoricModel.create(model as Optional<unknown, never>);
  }

  public static async get(
    id: string,
    userId: string
  ): Promise<UserHistoricModel> {
    const find = await UserHistoricModel.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });
    if (!find) {
      throw new HandlerError('Histórico não encontrado.', 404);
    }
    return find;
  }

  public static async getPaginated(i: IHistoricPaginated): Promise<IHistoric> {
    const offset = (i.page - 1) * i.pageSize;
    const limit = i.pageSize;
    let whereOptions: WhereOptions = {
      userId: i.userId,
    };
    if (i.filterType != null) {
      whereOptions = {
        userId: i.userId,
        type: i.filterType,
      };
    }
    const findAll = await UserHistoricModel.findAndCountAll({
      offset,
      limit,
      where: whereOptions,
      order: [
        ['id', 'DESC'],
        ['created_at', 'DESC'],
      ],
    });
    const totalPages = Math.ceil(findAll.count / i.pageSize);
    if (i.page > totalPages) {
      throw new HandlerError('Nenhum resultado foi encontrado.', 400);
    }
    const hasNextPage = i.page < totalPages;
    return {
      results: findAll.rows,
      totalCount: findAll.count,
      totalPages: totalPages,
      currentPage: i.page,
      hasNextPage: hasNextPage,
    };
  }

  public static async delete(
    id: string,
    userId: string
  ): Promise<HandlerSuccess> {
    await this.get(id, userId);
    await UserHistoricModel.destroy({
      where: {
        id: id,
      },
    });
    return new HandlerSuccess('Histórico excluído com sucesso.');
  }

  public static async exportToExcel(userId: string): Promise<{
    fileName: string;
    filePath: string;
  }> {
    const data = await this.findAll(userId);
    if (!data.length) {
      throw new HandlerError('Nenhum resultado foi encontrado.', 400);
    }
    const workbook = new Workbook();
    const worksheet: Worksheet = workbook.addWorksheet('Histórico');
    const headers = Object.keys(UserHistoricModel.getAttributes())
      .filter(
        header =>
          header !== 'id' && header !== 'userId' && header !== 'updatedAt'
      )
      .map(header => {
        switch (header) {
          case 'input':
            return 'Entrada de dados';
          case 'output':
            return 'Saída de dados';
          case 'type':
            return 'Ferramenta usada';
          case 'createdAt':
            return 'Data';
          default:
            return header;
        }
      });
    headers.forEach((header, columnIndex) => {
      worksheet.getCell(1, columnIndex + 1).value = header;
    });
    let rowIndex = 2;
    for (const item of data) {
      headers.forEach((header, columnIndex) => {
        let value: any;
        switch (header) {
          case 'Entrada de dados':
            value = item.input;
            break;
          case 'Saída de dados':
            value = item.output;
            break;
          case 'Ferramenta usada':
            value = translateEnumValue(item.type);
            break;
          case 'Data':
            value = formatDate(item.createdAt);
            break;
          default:
            value = item[header as keyof UserHistoricModel];
            break;
        }
        worksheet.getCell(rowIndex, columnIndex + 1).value = value;
      });
      rowIndex++;
    }
    const directory = 'exports';
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }
    const fileName = crypto.randomBytes(8).toString('hex') + '.xlsx';
    const filePath = `${directory}/${fileName}`;
    await workbook.xlsx.writeFile(filePath);
    return {
      fileName,
      filePath,
    };
  }

  private static async findAll(userId: string): Promise<UserHistoricModel[]> {
    const findAll = await UserHistoricModel.findAndCountAll({
      where: { userId: userId },
      order: [
        ['id', 'DESC'],
        ['created_at', 'DESC'],
      ],
    });
    return findAll.rows;
  }
}
