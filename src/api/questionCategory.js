
import BaseApi from '@/api/BaseApi'

class QuestionCategoryApi extends BaseApi {
  constructor() {
    super('/questionCategory')
  }
  moveDown(id) {
    return this.post(`/questionCategory/movedown/${id}`)
  }
  moveUp(id) {
    return this.post(`/questionCategory/moveup/${id}`)
  }
  findAllByDepartment(id) {
    return this.get(`/questionCategory/department/${id}`)
  }
  findQuestionWithDepartment() {
    return this.get('/questionCategory/withDepartment')
  }
}

const questionCategoryApi = new QuestionCategoryApi()
export default questionCategoryApi;

