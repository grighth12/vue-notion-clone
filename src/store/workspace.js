import router from '~/routes';

export default {
  namespaced: true,
  state() {
    return {
      workspaces: [],
      currentWorkspace: {},
      currentWorkspacePath: [],
    };
  },
  getters: {},
  mutations: {
    assignStates(state, payload) {
      Object.keys(payload);
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    }
  },
  actions: {
    async createWorkspace({dispatch}, payload = {}) {
      const { parentId } = payload;

      const workspace = await _request({
        method: 'POST',
        body: JSON.stringify({
          title: '',
          parent: parentId,
        })
      });

      await dispatch('readWorkspaces');

      router.push({
        name: 'Workspace',
        params: {
          id: workspace.id
        }
      });
    },
    async readWorkspaces({ dispatch, commit }) {
      const workspaces = await _request({
        method: 'GET',
      });

      commit('assignStates', {
        workspaces,
      });

      dispatch('findWorkspacePath');

      console.log(workspaces);
      if(!workspaces.length) {
        dispatch('createWorkspace');
      }
    },
    async readWorkspace({ commit }, payload) {
      try {
        const { id } = payload;
        const workspaces = await _request({
          method:'GET',
          id,
        });

        commit('assignStates', {
          currentWorkspace: workspaces,
        });
      } catch(error) {
        router.push('/error');
      }
    },
    async updateWorkspace({ commit, dispatch }, payload) {
      const { id, title, content } = payload;
      const workspace = await _request({
        method:'PUT',
        id,
        body: JSON.stringify({
          id,
          title,
          content
        })
      });

      commit('assignStates', {
        currentWorkspace: workspace,
      });

      await dispatch('readWorkspaces');
    },
    async deleteWorkspace({ state, dispatch }, payload) {
      const { id } = payload;
      await _request({
        method: 'DELETE',
        id
      });

      await dispatch('readWorkspaces');

      if (id === parseInt(router.currentRoute.value.params.id, 10)) {
        router.push({
          name: 'Workspace',
          params: {
            id: state.workspaces[0].id,
          }
        });
      }
    },
    findWorkspacePath({ state, commit }) {
      const currentWorkspaceId = parseInt(router.currentRoute.value.params.id, 10);
  
      function _find(workspace, parents) {
        if (currentWorkspaceId === workspace.id) {
          commit('assignStates', {
            currentWorkspacePath: [...parents, workspace]
          });
        }
        if (workspace.documents) {
          // Recursive
          workspace.documents.forEach((ws) => _find(ws, [...parents, workspace]));
        }
      }
      state.workspaces.forEach((workspace) => _find(workspace, []));
    }
  },
  
};

async function _request(options) {
  const { id = '' } = options; // NOTE 새로운 문법
  return await fetch(`https://kdt.roto.codes/documents/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-username': 'leon'
    },
    ...options,
  }).then((res) => res.json());
}