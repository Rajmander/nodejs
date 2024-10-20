import services from "../services/servicesService.js";

class ServiceController {
  async add(req, res) {
    const data = req.body;
    try {
      const result = await services.add(data);
      console.log("Result length>>", result);

      if (result.affectedRows > 0) {
        return res.status(201).json({
          msg: "Category added successfully",
          status: "success",
          statusCode: 201,
        });
      } else {
        return res.status(209).json({
          error: "Conflict",
          msg: "Category name already exists",
          status: "success",
          statusCode: 209,
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Server error",
        msg: "Something went wrong",
        status: "failed",
        statusCode: 500,
      });
    }
  }

  async update(req, res) {
    const data = req.body;
    data.id = req.params.id;
    try {
      const result = await services.update(data);
      console.log("Result length>>", result);

      if (result.affectedRows > 0) {
        return res.status(201).json({
          msg: "Category updated successfully",
          status: "success",
          statusCode: 201,
        });
      } else {
        return res.status(209).json({
          error: "Conflict",
          msg: "Category name already exists",
          status: "success",
          statusCode: 209,
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Server error",
        msg: "Something went wrong",
        status: "failed",
        statusCode: 500,
      });
    }
  }

  async show(req, res) {
    try {
      const result = await services.show();
      console.log("Result length>>", result);

      if (result.length > 0) {
        return res.status(200).json({
          msg: "Category listing",
          status: "success",
          data: result,
          statusCode: 200,
        });
      } else {
        return res.status(404).json({
          error: "Not Found",
          msg: "No record found",
          status: "success",
          statusCode: 200,
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Server error",
        msg: "Something went wrong",
        status: "failed",
        statusCode: 500,
      });
    }
  }

  async delete(req, res) {
    const id = req.params.id;
    try {
      const result = await services.delete(id);
      console.log("Result length>>", result);

      if (result.affectedRows > 0) {
        return res.status(201).json({
          msg: "Category deleted successfully",
          status: "success",
          statusCode: 201,
        });
      } else {
        return res.status(209).json({
          msg: "Category not deleted",
          status: "failed",
          statusCode: 500,
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Server error",
        msg: "Something went wrong",
        status: "failed",
        statusCode: 500,
      });
    }
  }
}
export default new ServiceController();
