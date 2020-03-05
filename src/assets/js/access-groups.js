import { Api, MembersApi } from './access-groups-api';

const defaultGroupInvitationExpiration = 5;

export default class AccessGroups {
  constructor() {
    this.api = new Api();
    // TODO: Remove this once we can confirm the new members work
    this.membersApi = new MembersApi();
  }

  /**
   * Access Group Methods
   */
  async getGroup(groupName) {
    try {
      return await this.api.execute({
        path: 'groups/get',
        endpointArguments: [groupName],
      });
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async updateGroupDetails(groupName, updateData) {
    try {
      return await this.api.execute({
        path: 'groups/put',
        endpointArguments: [groupName],
        dataArguments: updateData,
      });
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async leaveGroup(groupName) {
    try {
      return await this.api.execute({
        path: 'self/delete',
        endpointArguments: [groupName],
      });
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async createGroup(form) {
    try {
      return await this.api.execute({
        path: 'groups/post',
        dataArguments: form,
      });
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async closeGroup(groupName) {
    try {
      return await this.api.execute({
        path: 'groups/delete',
        endpointArguments: [groupName],
      });
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  /**
   * Members Methods
   */

  async getAllMembers(groupName) {
    try {
      return await this.api.execute({
        path: 'members/get',
        endpointArguments: [groupName, { sort: 'role-asc' }],
      });
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async getMembersFromOptions(groupName, options) {
    try {
      return await this.api.execute({
        path: 'members/get',
        endpointArguments: [groupName, options],
      });
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async deleteMember(groupName, uuid) {
    try {
      return await this.api.execute({
        path: 'members/delete',
        endpointArguments: [groupName, uuid],
      });
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async addCurators(groupName, curators) {
    try {
      for (const curator of curators) {
        await this.api.execute({
          path: 'curators/post',
          endpointArguments: [groupName],
          dataArguments: { uuid: curator.uuid },
        });
      }
      return 200;
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async removeCurators(groupName, curators, expiration) {
    try {
      for (const curator of curators) {
        await this.api.execute({
          path: 'curators/downgrade',
          endpointArguments: [groupName, curator.uuid],
          dataArguments: { groupExpiration: expiration },
        });
      }
      return 200;
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  // TODO: Confirm this method as we are not currently supporting it
  async renewMember(groupName, memberUuid, expiration) {
    try {
      // return await this.membersApi.renew(groupName, memberUuid, expiration);
      return await this.api.execute({
        path: 'members/renew',
        endpointArguments: [groupName, memberUuid],
        dataArguments: { groupExpiration: expiration },
      });
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async sendInvitations(groupName, members, expiration) {
    try {
      const results = [];
      for (const member of members) {
        results.push(
          await this.api.execute({
            path: 'groupInvitations/post',
            endpointArguments: [groupName],
            dataArguments: {
              uuid: member.uuid,
              invitationExpiration: defaultGroupInvitationExpiration,
              groupExpiration: parseInt(expiration),
            },
          })
        );
      }
      const errors = results.filter(code => code !== 200);
      if (errors.length) {
        throw new Error('Send invitation errors');
      }
      return 200;
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async sendRequest(groupName, members, expiration) {
    try {
      // await this.api.execute({
      //   path: 'groupInvitations/post',
      //   endpointArguments: [groupName],
      //   dataArguments: {
      //     uuid: member.uuid,
      //     invitationExpiration: defaultGroupInvitationExpiration,
      //     groupExpiration: parseInt(expiration),
      //   },
      // });
      return 200;
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async deleteInvitation(groupName, uuid) {
    try {
      await this.api.execute({
        path: 'groupInvitations/delete',
        endpointArguments: [groupName, uuid],
      });
      return 200;
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async rejectRequest(groupName, uuid) {
    try {
      // await this.api.execute({
      //   path: 'groupInvitations/delete',
      //   endpointArguments: [groupName, uuid],
      // });
      return 200;
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async getUserInvitations() {
    try {
      return await this.api.execute({
        path: 'selfInvitations/get',
      });
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async acceptInvitation(groupName) {
    try {
      return await this.api.execute({
        path: 'selfInvitations/post',
        endpointArguments: [groupName],
      });
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async rejectInvitation(groupName) {
    try {
      return await this.api.execute({
        path: 'selfInvitations/delete',
        endpointArguments: [groupName],
      });
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async getAccessGroupMemberInvitations(groupName) {
    try {
      return await this.api.execute({
        path: 'groupInvitations/get',
        endpointArguments: [groupName],
      });
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async getAccessGroupMemberRequests(groupName) {
    try {
      // return await this.api.execute({
      //   path: 'groupInvitations/get',
      //   endpointArguments: [groupName],
      // });
      return [];
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async updateAccessGroupTOS(groupName, text) {
    try {
      return await this.api.execute({
        path: 'terms/put',
        endpointArguments: [groupName],
        dataArguments: text,
      });
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async addAccessGroupTOS(groupName, text) {
    try {
      return await this.api.execute({
        path: 'terms/post',
        endpointArguments: [groupName],
        dataArguments: text,
      });
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async deleteAccessGroupTOS(groupName) {
    try {
      return await this.api.execute({
        path: 'terms/delete',
        endpointArguments: [groupName],
      });
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async getAccessGroupTOS(groupName) {
    try {
      return await this.api.execute({
        path: 'terms/get',
        endpointArguments: [groupName],
      });
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  // TODO: This method is one that will eventually be built but are not supported right now
  async updateInviteText(text) {
    return new Promise((res, rej) => {
      res('text updated');
    });
  }

  // TODO: This method is one that will eventually be built but are not supported right now
  async resendInvitation(text) {
    return new Promise((res, rej) => {
      res('invitation resent');
    });
  }

  static getAccessGroupUpdateData(data) {
    console.log('getting data: ', data);
    return {
      typ: 'type' in data ? data.type : '',
      description: 'description' in data ? data.description : '',
      group_expiration: 'expiration' in data ? data.expiration : 0,
    };
  }

  static async getUsers(q, groupName) {
    try {
      const api = new Api();
      let users = await api.execute({
        path: 'users/get',
        endpointArguments: [q, groupName],
      });
      // TODO: Replace this with: users = users.filter(({ email }) => email !== null);
      users = users.filter(({ first_name }) => first_name !== null);
      return users;
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }
}
