import { MCPServerCard } from "@/components/mcp-server-card"
import { SERVER_CONFIGS } from "@/server-configs"
import { capitalizeFirstLetter } from "@/utils"
import { Plus } from "lucide-react"

type MCPServer = {
	command: string
	args: string[]
	env?: Record<string, string>
}

type MCPServers = {
	[key: string]: MCPServer
}

type MCPConfig = {
	mcpServers: MCPServers
}

type MCPServersProps = {
	jsonContent: MCPConfig
	onUpdate: (newContent: MCPConfig) => void
	onServerAdd: (serverType: keyof typeof SERVER_CONFIGS) => void
	onServerRemove: (serverType: string) => void
}

export function MCPServers({
	jsonContent,
	onUpdate,
	onServerAdd,
	onServerRemove
}: MCPServersProps) {
	console.log("MCPServers component received props:", {
		servers: jsonContent.mcpServers,
		serverCount: Object.keys(jsonContent.mcpServers).length
	})

	const handleServerUpdate = (name: string, newConfig: MCPServer) => {
		console.log("Updating server:", name, newConfig)
		const updatedContent = {
			...jsonContent,
			mcpServers: {
				...jsonContent.mcpServers,
				[name]: newConfig
			}
		}
		onUpdate(updatedContent)
	}

	const handleServerDelete = (name: string) => {
		console.log("Deleting server:", name)
		onServerRemove(name)
	}

	const hasServers = Object.keys(jsonContent.mcpServers).length > 0
	console.log("Has servers:", hasServers)

	return (
		<div className="space-y-4 my-32">
			<div className="flex justify-between items-center mb-8">
				<div className="flex items-center gap-4">
					<h2 className="text-2xl text-center">Your MCP Servers</h2>
					<button
						type="button"
						className="btn btn-primary btn-sm"
						onClick={() => {
							const modal = document.getElementById(
								"add_server_modal"
							) as HTMLDialogElement
							if (modal) {
								modal.showModal()
							}
						}}
					>
						<Plus className="w-4 h-4" />
						<span>Add Server</span>
					</button>
				</div>
			</div>

			<dialog id="add_server_modal" className="modal backdrop-blur-sm">
				<div className="modal-box rounded-3xl">
					<div className="flex justify-between items-center mb-4 sticky top-0 py-4 -mt-4 -mx-6 px-6">
						<h3 className="text-xl ml-4">Add New Server</h3>
						<button
							type="button"
							className="btn btn-ghost btn-sm btn-circle"
							onClick={() => {
								const modal = document.getElementById(
									"add_server_modal"
								) as HTMLDialogElement
								if (modal) {
									modal.close()
								}
							}}
						>
							✕
						</button>
					</div>

					<div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto px-4">
						{Object.entries(SERVER_CONFIGS).map(
							([serverType, config]) => (
								<button
									key={serverType}
									type="button"
									className="w-full bg-base-200 hover:bg-base-300 rounded-3xl p-4 flex items-center gap-6 h-24"
									onClick={() => {
										onServerAdd(
											serverType as keyof typeof SERVER_CONFIGS
										)
										const modal = document.getElementById(
											"add_server_modal"
										) as HTMLDialogElement
										if (modal) {
											modal.close()
										}
									}}
								>
									<div className="my-auto mx-2">
										<img
											src={config.icon}
											alt={`${serverType} icon`}
											className="w-10 h-10 object-contain"
										/>
									</div>
									<div className="flex flex-col text-left w-full">
										<span className="text-xl font-normal mb-1">
											{capitalizeFirstLetter(serverType)}
										</span>
										<p className="text-sm opacity-80">
											{config.description}
										</p>
									</div>
								</button>
							)
						)}
					</div>
				</div>
			</dialog>

			<div className="space-y-4">
				{hasServers ? (
					Object.entries(jsonContent.mcpServers).map(
						([name, config]) => {
							console.log("Rendering server:", name, config)
							const serverConfig =
								SERVER_CONFIGS[
									name as keyof typeof SERVER_CONFIGS
								]

							return (
								<MCPServerCard
									key={name}
									serverName={name}
									config={config}
									icon={serverConfig?.icon}
									onUpdate={handleServerUpdate}
									onDelete={handleServerDelete}
								/>
							)
						}
					)
				) : (
					<p className="text-gray-500 text-center">
						You currently have no MCP servers configured. Add one by
						clicking the "Add Server" button.
					</p>
				)}
			</div>
		</div>
	)
}
